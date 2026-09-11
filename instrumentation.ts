/**
 * Next.js server bootstrap. Runs once per server process, before any request.
 *
 * Starts the interview drive's email worker so reminders and retries send
 * themselves — no external cron job, no shared secret to configure.
 */
export async function register() {
  // Only the Node.js server runtime; skip the edge runtime and the browser.
  if (process.env.NEXT_RUNTIME !== "nodejs") return

  const { startEmailWorker } = await import("@/lib/interview-drive/scheduler")
  startEmailWorker()
}
