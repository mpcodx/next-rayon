# Fresher Tech Interview Drive 2026

A self-contained, time-boxed hiring campaign: a public booking page at
`/interview-drive` and an authenticated dashboard at `/interview-drive-admin`.

The campaign runs **14–18 September 2026**. After that it closes itself.

---

## Quick start

### Setup

No external database is required. Booking submissions and candidate details are sent directly via email.

```bash
# 1. In environment variables / .env, set:
#      EMAIL_USER=...
#      EMAIL_PASS=...
#      EMAIL_TO=... (defaults to EMAIL_USER)

# 2. Deploy or run locally:
npm run build
npm run start
```


---

## How the pieces fit

```
  Candidate                     Server                        Storage
  ─────────                     ──────                        ───────
  picks date  ──► GET  /api/interview-drive/slots ──────────► slot grid
                                                              + booking index
  picks slot  ──► POST /api/interview-drive/verify-slot
  submits     ──► POST /api/interview-drive/bookings
                        │
                        ├─ validate (zod, server-side)
                        ├─ store resume outside /public
                        ├─ ┌──────── transaction ─────────┐
                        │  │ re-read committed state      │
                        │  │ slot free? email unused?     │
                        │  │ write booking                │
                        │  └──────────────────────────────┘
                        ├─ queue emails (same commit)
                        ├─ respond 201  ◄── candidate never waits on SMTP
                        └─ after() ─► email worker sends
```

## The review workflow

A booking is **not** confirmed the moment a candidate submits. It is held for
review, and an admin decides.

```
  Candidate submits
        │
        ▼
  status: PENDING REVIEW ──► "Details received, under review" email
        │                     (slot is HELD — nobody else can take it)
        │                     HR is notified
        │
        ▼   admin opens the candidate, verifies their details,
        │   then sets the status to Scheduled
        ▼
  status: SCHEDULED ───────► "Interview confirmed" email with date + time
                              24h and 1h reminders are scheduled
```

Why it works this way:

- **The slot is reserved while pending.** A candidate awaiting review cannot
  lose their time to someone else, and no second candidate can book it.
- **Only the Pending → Scheduled transition sends the confirmation.** Re-saving
  an already-scheduled booking does not send a duplicate.
- **Reminders follow the confirmation, not the submission.** A candidate who
  was never approved is never reminded; rejecting or cancelling drops any
  pending reminders.
- **Rescheduling a pending candidate does not email them a new time** — they
  have not been given one yet. Rescheduling a scheduled candidate does.

## Where things live

| Path | Purpose |
| --- | --- |
| `lib/interview-drive/config.ts` | Campaign dates, tracks, languages, statuses. Single source of truth. |
| `lib/interview-drive/ist.ts` | All IST date/time maths and formatting. |
| `lib/interview-drive/store.ts` | Driver dispatcher (Postgres vs filesystem). |
| `lib/interview-drive/store-postgres.ts` | Postgres driver — row-locked transactions. |
| `lib/interview-drive/store-file.ts` | Filesystem driver — mutex + lock file + atomic writes. |
| `lib/interview-drive/store-shared.ts` | Document model, slot grid, seeding. |
| `lib/interview-drive/repo.ts` | Booking rules — the transaction boundary. |
| `lib/interview-drive/auth.ts` | scrypt passwords, sessions, CSRF, rate limits. |
| `lib/interview-drive/email.ts` | Durable email queue + send logic. |
| `lib/interview-drive/scheduler.ts` | In-process worker; started by `instrumentation.ts`. |
| `lib/interview-drive/admin-service.ts` | Dashboard queries and mutations. |
| `app/interview-drive/` | Public landing page. |
| `app/interview-drive-admin/` | Admin dashboard. |
| `data/` | Bookings + resumes, filesystem driver only. **Gitignored. Back this up.** |
| `vercel.json` | Schedules the email worker ping on Vercel. |

---

## Storage

`store.ts` picks a driver from the environment. Nothing above it knows which:

| `DATABASE_URL` | Driver | Use |
| --- | --- | --- |
| set | `store-postgres.ts` | Vercel and any serverless host. **Required** there. |
| unset | `store-file.ts` | Local development, Docker / VPS with a volume. |

The campaign is stored as one small document — a fixed 160-slot grid plus at
most a few hundred bookings over five days — which is why both drivers can
share every business rule in `repo.ts` verbatim. On Postgres that document is
a single JSONB row; the dataset is bounded, always read whole to compute
availability, and each write is one row update.

If the app is deployed to serverless **without** `DATABASE_URL`, it fails
immediately with an explanatory error rather than the bare
`ENOENT: mkdir '/var/task/data'` that a read-only filesystem would otherwise
produce.

---

## How double-booking is prevented

### On Postgres (serverless)

Every mutation runs in a transaction that takes `SELECT ... FOR UPDATE` on the
state row before reading it. Two requests for the same slot are serialised by
the database — even on different instances in different regions — and the
loser re-reads committed state and fails cleanly with `slot_taken`. A
`lock_timeout` keeps a stuck peer from hanging a booking request.

**Verified:** 30 requests split across **two independent server processes**
sharing one database produced exactly **1** booking. 25 concurrent requests
against one instance produced 1 × `201` and 24 × `409 slot_taken` in 733 ms.

### On the filesystem (self-hosted)

Three layers, all required:

1. **An in-process async mutex** — overlapping requests queue rather than interleave.
2. **An on-disk `O_EXCL` lock file** — covers other processes on the same host.
   Stale locks are reclaimed after 15s.
3. **A fresh read from disk inside the lock** — no mutation sees stale state.

Commits are `write-temp → fsync → rename`, atomic on POSIX: a crash mid-write
leaves the previous good file intact, never a half-written one.

**Verified:** 30 concurrent attempts across 6 separate OS processes produced
exactly 1 booking.

### Either way

The uniqueness rules a wide relational schema would express as constraints —
one active booking per slot, one active booking per candidate email — are
enforced inside the locked section, in `createBooking()`.

---

## Booking statuses

| Status | Meaning | Slot held? | Reminders? |
| --- | --- | --- | --- |
| **Pending Review** | Submitted, awaiting admin verification. The default. | Yes | No |
| **Scheduled** | Admin verified and confirmed. Candidate has been emailed a time. | Yes | Yes |
| **Completed** | Interview took place. | Yes | No |
| **Selected** | Candidate passed. | Yes | No |
| **Rejected** | Candidate did not pass. | Yes | No |
| **No Show** | Candidate did not attend. | Yes | No |
| **Cancelled** | Booking withdrawn — the slot is released back to the pool. | No | No |

---

## Admin accounts

The environment is the single source of truth for who can sign in. On boot,
the app seeds the account named by `INTERVIEW_ADMIN_EMAIL`, applies any changed
`INTERVIEW_ADMIN_PASSWORD_HASH`, and **removes any admin the environment no
longer configures**, killing its sessions. Changing the configured email
therefore revokes the previous account rather than leaving it live.

---

## Security

| Control | Implementation |
| --- | --- |
| Passwords | scrypt (N=16384), random salt, constant-time compare. Never plaintext. |
| Sessions | 32-byte random token; only its SHA-256 is stored. HttpOnly, SameSite=Lax, 8h TTL. |
| CSRF | Session-bound token required on every mutating admin request. |
| Login throttling | 5/account and 10/IP per 15 minutes. |
| User enumeration | Identical message and timing for unknown account vs wrong password. |
| Resumes | Stored outside `/public`; magic-byte checked; served only to authenticated admins, as sandboxed attachments. |
| Public API | Returns times and states only — never an email, phone, resume or note. |
| Audit log | Logins, status changes, reschedules, slot blocks and resume downloads. |

`robots.txt` is **not** a security control here. The admin dashboard checks the
session server-side on the page itself *and* on every API route it calls.

---

## Search engine exclusion

Four independent layers, because this campaign must not be indexed:

1. `<meta name="robots" content="noindex, nofollow, noarchive, nocache">` on both pages.
2. `X-Robots-Tag: noindex, nofollow, noarchive` from `middleware.ts` (also covers API responses).
3. `Disallow` entries in `app/robots.ts` for all six user-agent rules.
4. Absent from `PAGE_SEO`, which is what generates `sitemap.xml` — so it can never appear there.

The page is also not linked from any indexable navigation.

---

## Email

Sending reuses the site's existing `EMAIL_USER` / `EMAIL_PASS` Gmail account —
the same one the contact form uses. There is no second mail account and no
extra sending configuration.

Booking and delivery are decoupled on purpose: **a failing mail provider can
never cancel or delay a confirmed interview slot.** The booking commits, jobs
are queued in the same commit, the response returns, and `after()` dispatches.

Emails per booking:

| Kind | When |
| --- | --- |
| `confirmation` | Immediately, to the candidate. |
| `admin_notification` | Immediately, to `EMAIL_TO` (defaults to `EMAIL_USER`). |
| `reminder_24h` | 24 hours before the interview. |
| `reminder_1h` | 1 hour before. |

Failures retry with backoff (1m, 5m, 15m, 1h, 3h) up to 5 attempts. Status is
`pending → retrying → sent | failed`, visible per candidate in the dashboard,
with a **Resend Confirmation Email** action.

Reminders are re-derived from the booking's *current* time, so a rescheduled
candidate is reminded about the new slot. Cancelled, rejected, completed and
no-show bookings stop receiving reminders automatically.

### The worker

**On Vercel**, serverless functions freeze between requests, so an in-process
timer can never fire. `vercel.json` schedules `/api/interview-drive/cron` every
5 minutes and Vercel calls it for you. Set `CRON_SECRET` to any long random
string — Vercel injects it into its own scheduled calls, so nobody else can
trigger a flush. Note that Vercel's Hobby plan limits cron to **once per day**;
for reliable 1-hour reminders use a Pro plan, or point a free external cron
(cron-job.org, UptimeRobot) at the same endpoint every 5 minutes.

Confirmation emails do not wait for cron either way — they are dispatched by
`after()` on the booking request itself.

**Self-hosted**, nothing needs scheduling. On server start,
`instrumentation.ts` launches an in-process worker (`lib/interview-drive/scheduler.ts`)
that drains the queue every 60 seconds, so confirmations, retries and the
24h/1h reminders all send on their own. It also drains once at boot, catching
anything that fell due while the server was down.

Two guards worth knowing about:

- Ticks never overlap — a slow SMTP round cannot stack up workers.
- A reminder is re-checked against the booking's *current* interview time when
  it is claimed. If the interview is not actually within the window yet (say
  the booking was moved later), the job is pushed back rather than sent early.

`POST /api/interview-drive/cron` accepts a signed-in admin, a caller holding
`CRON_SECRET`, or — when no secret is configured — Vercel's own cron header.
It only flushes already-queued emails and returns counts, so it exposes no
candidate data.

Tune the interval with `INTERVIEW_EMAIL_TICK_MS` (default `60000`).

---

## API

### Public — no candidate data, ever

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/interview-drive/config` | Campaign state + per-date availability. |
| `GET` | `/api/interview-drive/slots?date=` | Slots for one date: time + state only. |
| `POST` | `/api/interview-drive/verify-slot` | Pre-submit availability check. |
| `POST` | `/api/interview-drive/bookings` | Create a booking. |
| `POST` | `/api/interview-drive/bookings/lookup` | Requires booking ID **and** matching email. |

### Admin — 401 without a session

`GET /me`, `GET /overview`, `GET /candidates`, `GET|PATCH /candidates/[id]`,
`POST /candidates/[id]/reschedule`, `POST /candidates/[id]/resend-email`,
`GET|POST /slots`, `GET /resume/[id]`, `POST /login`, `POST /logout`.

Mutating requests require the `x-rw-csrf-token` header.

---

## Timezone

Everything is IST (Asia/Kolkata), stored as wall-clock `YYYY-MM-DD` +
`HH:mm` strings and converted with a fixed +05:30 offset (India has never
observed DST). No booking path reads the server's local timezone or trusts a
browser-supplied timestamp, so a candidate in London and one in Delhi see and
book the identical slot. Emails always state the time with an explicit `IST`
suffix.

---

## Changing the campaign window

Set `INTERVIEW_DRIVE_START_DATE` / `INTERVIEW_DRIVE_END_DATE` and restart. The
stored drive record re-syncs from config on the next read, the slot grid is
regenerated, and slots that already carry a booking or an admin block are
preserved.

Bookings close automatically at 23:59:59 IST on the end date. After that the
page renders **🔒 Interview Drive Closed**, the booking APIs return `403`, and
the admin dashboard stays fully available with all candidate data intact.
