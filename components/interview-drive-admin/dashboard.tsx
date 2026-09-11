"use client"

import {
  CalendarDays,
  CheckCircle2,
  Download,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  ShieldAlert,
  Users,
  ClipboardCheck,
  X,
  XCircle,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import {
  BOOKING_STATUSES,
  BOOKING_STATUS_LABELS,
  INTERVIEW_LANGUAGES,
  TECHNOLOGY_TRACKS,
  type BookingStatus,
} from "@/lib/interview-drive/config"
import { formatIstTimestamp } from "@/lib/interview-drive/ist"
import { cn } from "@/lib/utils"

import CandidateDrawer from "./candidate-drawer"
import SlotsPanel from "./slots-panel"
import { STATUS_STYLES, StatBlock, type CandidateRowView, type OverviewView } from "./shared"

/**
 * Interview drive admin dashboard.
 *
 * Every request here goes to an authenticated endpoint; the CSRF token is
 * fetched from /me on mount and attached to each mutating call. Nothing on
 * this screen is reachable without a valid session cookie.
 */
export default function AdminDashboard({ admin }: { admin: { name: string; email: string } }) {
  const [csrfToken, setCsrfToken] = useState("")
  const [overview, setOverview] = useState<OverviewView | null>(null)
  const [rows, setRows] = useState<CandidateRowView[]>([])
  const [colleges, setColleges] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"candidates" | "slots">("candidates")
  const [openBookingId, setOpenBookingId] = useState<string | null>(null)
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null)

  const [filters, setFilters] = useState({
    date: "",
    technology: "",
    status: "",
    language: "",
    college: "",
    search: "",
    sortBy: "interview_date",
    sortDir: "asc",
  })

  /* ------------------------------------------------------------- loading */

  const loadOverview = useCallback(async () => {
    const response = await fetch("/api/interview-drive-admin/overview", { cache: "no-store" })
    if (response.ok) {
      const data = await response.json()
      setOverview(data.overview as OverviewView)
    }
  }, [])

  const loadCandidates = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(filters)) {
        if (value) params.set(key, value)
      }
      params.set("page", String(page))

      const response = await fetch(`/api/interview-drive-admin/candidates?${params}`, { cache: "no-store" })
      if (!response.ok) {
        setNotice({ tone: "error", text: "Could not load candidates." })
        return
      }
      const data = await response.json()
      setRows(data.rows as CandidateRowView[])
      setColleges(data.colleges as string[])
      setTotal(data.total as number)
      setTotalPages(data.totalPages as number)
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/interview-drive-admin/me", { cache: "no-store" })
      if (response.ok) {
        const data = await response.json()
        setCsrfToken(data.csrfToken as string)
      }
      await loadOverview()
    })()
  }, [loadOverview])

  useEffect(() => {
    void loadCandidates()
  }, [loadCandidates])

  // Debounce free-text search so typing does not fire a request per keystroke.
  const [searchDraft, setSearchDraft] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => (prev.search === searchDraft ? prev : { ...prev, search: searchDraft }))
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchDraft])

  const setFilter = (patch: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPage(1)
  }

  /* ----------------------------------------------------------- mutations */

  const authedFetch = useCallback(
    async (url: string, init: RequestInit = {}) => {
      return fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          "x-rw-csrf-token": csrfToken,
          ...(init.headers ?? {}),
        },
      })
    },
    [csrfToken],
  )

  const updateStatus = async (bookingId: string, status: BookingStatus) => {
    const response = await authedFetch(`/api/interview-drive-admin/candidates/${bookingId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
    const data = await response.json().catch(() => ({}))
    if (response.ok && data?.ok) {
      setNotice({ tone: "ok", text: `Status updated to ${BOOKING_STATUS_LABELS[status]}.` })
      await Promise.all([loadCandidates(), loadOverview()])
    } else {
      setNotice({ tone: "error", text: data?.message ?? "Could not update status." })
    }
  }

  const logout = async () => {
    await fetch("/api/interview-drive-admin/logout", { method: "POST" })
    window.location.reload()
  }

  const refreshAll = async () => {
    await Promise.all([loadCandidates(), loadOverview()])
    setNotice({ tone: "ok", text: "Refreshed." })
  }

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([key, value]) => value && !["sortBy", "sortDir"].includes(key)).length,
    [filters],
  )

  /* ----------------------------------------------------------- rendering */

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="sticky top-20 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Interview Drive Admin</h1>
            <p className="text-xs text-gray-400">
              Signed in as {admin.name} · {admin.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void refreshAll()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <RefreshCw aria-hidden="true" className={cn("h-3.5 w-3.5", loading && "animate-spin")} strokeWidth={2} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <LogOut aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        {notice ? (
          <div
            role="status"
            className={cn(
              "mb-5 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium",
              notice.tone === "ok"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                : "border-rose-400/30 bg-rose-500/10 text-rose-100",
            )}
          >
            <span className="flex items-center gap-2">
              {notice.tone === "ok" ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              ) : (
                <ShieldAlert aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              )}
              {notice.text}
            </span>
            <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss">
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        ) : null}

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">
            Dashboard overview
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            <StatBlock label="Applications" value={overview?.totalApplications} icon={Users} />
            <StatBlock label="Pending review" value={overview?.pendingReview} icon={ClipboardCheck} tone="amber" />
            <StatBlock label="Bookings" value={overview?.totalBookings} icon={CalendarDays} tone="sky" />
            <StatBlock label="Available" value={overview?.availableSlots} tone="emerald" />
            <StatBlock label="Booked" value={overview?.bookedSlots} tone="sky" />
            <StatBlock label="Today" value={overview?.todaysInterviews} />
            <StatBlock label="Selected" value={overview?.selected} tone="emerald" icon={CheckCircle2} />
            <StatBlock label="Rejected" value={overview?.rejected} tone="rose" icon={XCircle} />
          </div>

          {overview && overview.pendingReview > 0 ? (
            <button
              type="button"
              onClick={() => {
                setTab("candidates")
                setFilter({ status: filters.status === "pending" ? "" : "pending" })
              }}
              aria-pressed={filters.status === "pending"}
              className={cn(
                "mt-3 flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                filters.status === "pending"
                  ? "border-amber-400/60 bg-amber-500/15 text-amber-100"
                  : "border-amber-400/25 bg-amber-500/[0.08] text-amber-100/90 hover:bg-amber-500/15",
              )}
            >
              <ClipboardCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-300" strokeWidth={2} />
              <span>
                <strong className="font-semibold text-amber-200">{overview.pendingReview}</strong> candidate
                {overview.pendingReview === 1 ? "" : "s"} awaiting verification — review their details, then set the
                status to <strong className="font-semibold text-amber-200">Scheduled</strong> to send the interview
                confirmation.
              </span>
            </button>
          ) : null}

          {overview && (overview.emailsPending > 0 || overview.emailsFailed > 0) ? (
            <p className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-gray-300">
              <Mail aria-hidden="true" className="h-3.5 w-3.5 text-gray-500" strokeWidth={2} />
              Email queue: <strong className="text-gray-100">{overview.emailsPending}</strong> pending,{" "}
              <strong className={overview.emailsFailed > 0 ? "text-rose-300" : "text-gray-100"}>
                {overview.emailsFailed}
              </strong>{" "}
              failed.
            </p>
          ) : null}
        </section>

        {/* Date-wise view */}
        <section aria-labelledby="datewise-heading" className="mt-6">
          <h2 id="datewise-heading" className="text-sm font-semibold text-white">
            Date-wise availability
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {(overview?.byDate ?? []).map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  setTab("candidates")
                  setFilter({ date: filters.date === day.date ? "" : day.date })
                }}
                aria-pressed={filters.date === day.date}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
                  filters.date === day.date
                    ? "border-cyan-400/70 bg-cyan-500/15 ring-1 ring-cyan-400/50"
                    : "border-white/10 bg-white/[0.04] hover:border-cyan-400/40 hover:bg-white/[0.08]",
                )}
              >
                <p className="text-sm font-bold text-white">{day.shortLabel}</p>
                <p className="text-[11px] text-gray-400">{day.weekday}</p>
                <dl className="mt-2.5 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total</dt>
                    <dd className="font-semibold text-gray-100">{day.totalSlots}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Booked</dt>
                    <dd className="font-semibold text-cyan-300">{day.bookedSlots}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Available</dt>
                    <dd className="font-semibold text-emerald-300">{day.availableSlots}</dd>
                  </div>
                  {day.blockedSlots > 0 ? (
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Blocked</dt>
                      <dd className="font-semibold text-gray-300">{day.blockedSlots}</dd>
                    </div>
                  ) : null}
                </dl>
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 border-b border-white/10" role="tablist">
          {(["candidates", "slots"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600",
                tab === key
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-gray-400 hover:text-gray-100",
              )}
            >
              {key === "candidates" ? `Candidates (${total})` : "Slot management"}
            </button>
          ))}
        </div>

        {tab === "slots" ? (
          <SlotsPanel csrfToken={csrfToken} dates={overview?.byDate ?? []} onChanged={() => void loadOverview()} />
        ) : (
          <section aria-labelledby="candidates-heading" className="mt-5">
            <h2 id="candidates-heading" className="sr-only">
              Candidates
            </h2>

            {/* Filters */}
            <div className="glass-card rounded-2xl p-4">
              <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                <div className="sm:col-span-2 xl:col-span-2">
                  <label htmlFor="filter-search" className="sr-only">
                    Search by name, email or booking ID
                  </label>
                  <div className="relative">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      strokeWidth={2}
                    />
                    <input
                      id="filter-search"
                      type="search"
                      value={searchDraft}
                      onChange={(e) => setSearchDraft(e.target.value)}
                      placeholder="Name, email or booking ID…"
                      className="w-full rounded-xl border border-white/15 bg-slate-900/60 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <SelectFilter
                  id="filter-date"
                  label="Date"
                  value={filters.date}
                  onChange={(value) => setFilter({ date: value })}
                  options={(overview?.byDate ?? []).map((d) => ({ value: d.date, label: d.shortLabel }))}
                />
                <SelectFilter
                  id="filter-technology"
                  label="Technology"
                  value={filters.technology}
                  onChange={(value) => setFilter({ technology: value })}
                  options={TECHNOLOGY_TRACKS.map((t) => ({ value: t.id, label: t.name }))}
                />
                <SelectFilter
                  id="filter-status"
                  label="Status"
                  value={filters.status}
                  onChange={(value) => setFilter({ status: value })}
                  options={BOOKING_STATUSES.map((s) => ({ value: s, label: BOOKING_STATUS_LABELS[s] }))}
                />
                <SelectFilter
                  id="filter-language"
                  label="Language"
                  value={filters.language}
                  onChange={(value) => setFilter({ language: value })}
                  options={INTERVIEW_LANGUAGES.map((l) => ({ value: l.id, label: l.name }))}
                />
                <SelectFilter
                  id="filter-college"
                  label="College"
                  value={filters.college}
                  onChange={(value) => setFilter({ college: value })}
                  options={colleges.map((c) => ({ value: c, label: c }))}
                />
              </div>

              <div className="relative mt-3 flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
                <SelectFilter
                  id="sort-by"
                  label="Sort by"
                  inline
                  value={filters.sortBy}
                  allowEmpty={false}
                  onChange={(value) => setFilter({ sortBy: value })}
                  options={[
                    { value: "interview_date", label: "Interview date" },
                    { value: "interview_time", label: "Interview time" },
                    { value: "registration_date", label: "Registration date" },
                    { value: "name", label: "Candidate name" },
                  ]}
                />
                <SelectFilter
                  id="sort-dir"
                  label="Order"
                  inline
                  value={filters.sortDir}
                  allowEmpty={false}
                  onChange={(value) => setFilter({ sortDir: value })}
                  options={[
                    { value: "asc", label: "Ascending" },
                    { value: "desc", label: "Descending" },
                  ]}
                />
                {activeFilterCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchDraft("")
                      setFilters({
                        date: "",
                        technology: "",
                        status: "",
                        language: "",
                        college: "",
                        search: "",
                        sortBy: "interview_date",
                        sortDir: "asc",
                      })
                      setPage(1)
                    }}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                    Clear {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"}
                  </button>
                ) : null}
              </div>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wide text-gray-400">
                    <tr>
                      {["Booking ID", "Candidate", "Contact", "College", "Year", "Technology", "Interview", "Lang", "Resume", "Email", "Status", "Created"].map(
                        (heading) => (
                          <th key={heading} scope="col" className="whitespace-nowrap px-3 py-3 font-semibold">
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan={12} className="px-3 py-16 text-center text-gray-400">
                          <Loader2 aria-hidden="true" className="mx-auto h-5 w-5 animate-spin" strokeWidth={2} />
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="px-3 py-16 text-center text-gray-400">
                          No candidates match these filters.
                        </td>
                      </tr>
                    ) : (
                      rows.map((row) => (
                        <tr key={row.bookingId} className="transition-colors hover:bg-white/[0.04]">
                          <td className="whitespace-nowrap px-3 py-3">
                            <button
                              type="button"
                              onClick={() => setOpenBookingId(row.bookingId)}
                              className="font-mono text-xs font-bold text-cyan-300 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                            >
                              {row.bookingReference}
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-100">{row.name}</td>
                          <td className="px-3 py-3 text-xs text-gray-300">
                            <a href={`mailto:${row.email}`} className="block hover:text-cyan-300">
                              {row.email}
                            </a>
                            <a href={`tel:${row.phone}`} className="block text-gray-500 hover:text-cyan-300">
                              {row.phone}
                            </a>
                          </td>
                          <td className="max-w-[180px] truncate px-3 py-3 text-xs text-gray-300" title={row.college}>
                            {row.college}
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-300">{row.graduationYear}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-200">{row.technology}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-xs">
                            <span className="block font-medium text-gray-100">{row.interviewDateLabel}</span>
                            <span className="block text-gray-400">{row.interviewTimeLabel} IST</span>
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-300">{row.language}</td>
                          <td className="px-3 py-3">
                            {row.resume ? (
                              <a
                                href={`/api/interview-drive-admin/resume/${row.resume.id}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:underline"
                              >
                                <Download aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
                                CV
                              </a>
                            ) : (
                              <span className="text-xs text-gray-600">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <EmailPill status={row.emailStatus.confirmation !== "none" ? row.emailStatus.confirmation : row.emailStatus.submission} />
                          </td>
                          <td className="px-3 py-3">
                            <label className="sr-only" htmlFor={`status-${row.bookingId}`}>
                              Status for {row.bookingReference}
                            </label>
                            <select
                              id={`status-${row.bookingId}`}
                              value={row.status}
                              onChange={(e) => void updateStatus(row.bookingId, e.target.value as BookingStatus)}
                              className={cn(
                                "rounded-lg border px-2 py-1 text-xs font-semibold outline-none transition-colors focus:ring-2 focus:ring-cyan-400/20",
                                "[&>option]:bg-slate-900 [&>option]:text-gray-100",
                                STATUS_STYLES[row.status] ?? "border-white/20 bg-white/5 text-gray-200",
                              )}
                            >
                              {BOOKING_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {BOOKING_STATUS_LABELS[status]}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-400">
                            {formatIstTimestamp(row.createdAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 ? (
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                  <p className="text-xs text-gray-400">
                    Page {page} of {totalPages} · {total} candidate{total === 1 ? "" : "s"}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )}
      </main>

      {openBookingId ? (
        <CandidateDrawer
          bookingId={openBookingId}
          csrfToken={csrfToken}
          onClose={() => setOpenBookingId(null)}
          onChanged={() => {
            void loadCandidates()
            void loadOverview()
          }}
          onNotice={setNotice}
        />
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------ sub-pieces */

function SelectFilter({
  id,
  label,
  value,
  onChange,
  options,
  inline,
  allowEmpty = true,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  inline?: boolean
  allowEmpty?: boolean
}) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      <label
        htmlFor={id}
        className={inline ? "text-xs font-medium text-gray-300" : "mb-1 block text-[11px] font-medium text-gray-400"}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-2.5 py-2 text-sm text-gray-100 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 [&>option]:bg-slate-900 [&>option]:text-gray-100"
      >
        {allowEmpty ? <option value="">All</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function EmailPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    sent: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
    pending: "bg-amber-500/15 text-amber-200 border-amber-400/30",
    retrying: "bg-amber-500/15 text-amber-200 border-amber-400/30",
    failed: "bg-rose-500/15 text-rose-200 border-rose-400/30",
    none: "bg-white/5 text-gray-400 border-white/10",
  }
  return (
    <span className={cn("inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize", styles[status] ?? styles.none)}>
      {status}
    </span>
  )
}
