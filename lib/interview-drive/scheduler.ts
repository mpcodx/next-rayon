import { isEmailConfigured, processEmailQueue } from "./email"

/**
 * In-process email worker.
 *
 * Confirmations are dispatched right after their request via `after()`, but
 * reminders and retries fire at their own time — long after any request has
 * finished. Rather than require an external cron job and a shared secret, the
 * server drains the queue on a timer itself.
 *
 * This suits the single-container deployment this app runs in. Should the app
 * ever be scaled to several instances, each would tick independently — which
 * stays correct because claiming a job is transactional and leased, so two
 * workers cannot send the same email, but an external scheduler hitting
 * `/api/interview-drive/cron` would then be the tidier arrangement.
 */

const TICK_MS = Number(process.env.INTERVIEW_EMAIL_TICK_MS) || 60_000

/** Module state is per-process; the guard also survives dev hot reloads. */
declare global {
  var __interviewDriveEmailTimer: NodeJS.Timeout | undefined
}

let running = false

async function tick(): Promise<void> {
  // Never let two ticks overlap: a slow SMTP round can outlast the interval.
  if (running) return
  running = true
  try {
    const result = await processEmailQueue()
    if (result.sent > 0 || result.failed > 0) {
      console.log(
        `[interview-drive] email worker: ${result.sent} sent, ${result.failed} failed, ` +
          `${result.dropped} dropped, ${result.rescheduled} rescheduled`,
      )
    }
  } catch (error) {
    // Never throw from the timer — an unhandled rejection here would take the
    // whole server down over a transient mail failure.
    console.error("[interview-drive] email worker tick failed:", error)
  } finally {
    running = false
  }
}

export function startEmailWorker(): void {
  if (globalThis.__interviewDriveEmailTimer) return

  if (!isEmailConfigured()) {
    console.warn("[interview-drive] email worker not started: EMAIL_USER/EMAIL_PASS are not configured.")
    return
  }

  const timer = setInterval(() => {
    void tick()
  }, TICK_MS)
  // Do not hold the event loop open on shutdown.
  timer.unref?.()
  globalThis.__interviewDriveEmailTimer = timer

  console.log(`[interview-drive] email worker started (every ${Math.round(TICK_MS / 1000)}s)`)

  // Catch anything that fell due while the server was down.
  void tick()
}

export function stopEmailWorker(): void {
  if (globalThis.__interviewDriveEmailTimer) {
    clearInterval(globalThis.__interviewDriveEmailTimer)
    globalThis.__interviewDriveEmailTimer = undefined
  }
}
