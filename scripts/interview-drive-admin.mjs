#!/usr/bin/env node
/**
 * Generates a scrypt password hash for an interview drive admin.
 *
 * The plaintext password never leaves this process and is never written to
 * disk — copy the printed hash into INTERVIEW_ADMIN_PASSWORD_HASH.
 *
 *   node scripts/interview-drive-admin.mjs
 *   node scripts/interview-drive-admin.mjs "my-password"
 */

import crypto from "node:crypto"
import readline from "node:readline"

const SCRYPT_N = 16_384
const SCRYPT_r = 8
const SCRYPT_p = 1
const SCRYPT_KEYLEN = 64

function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(password.normalize("NFKC"), salt, SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_r,
    p: SCRYPT_p,
    maxmem: 128 * SCRYPT_N * SCRYPT_r * 2,
  })
  // ":" separated, not "$": dotenv expands $NAME and would corrupt the hash.
  return ["scrypt", SCRYPT_N, SCRYPT_r, SCRYPT_p, salt.toString("base64url"), hash.toString("base64url")].join(":")
}

function checkStrength(password) {
  const problems = []
  if (password.length < 12) problems.push("use at least 12 characters")
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) problems.push("mix upper and lower case")
  if (!/\d/.test(password)) problems.push("include a digit")
  if (!/[^A-Za-z0-9]/.test(password)) problems.push("include a symbol")
  return problems
}

/** Prompts without echoing the password back to the terminal. */
async function promptHidden(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
  return new Promise((resolve) => {
    const onData = () => {
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(question)
    }
    process.stdin.on("data", onData)
    rl.question(question, (answer) => {
      process.stdin.removeListener("data", onData)
      process.stdout.write("\n")
      rl.close()
      resolve(answer)
    })
  })
}

const password = process.argv[2] ?? (await promptHidden("Admin password: "))

if (!password) {
  console.error("No password provided.")
  process.exit(1)
}

const problems = checkStrength(password)
if (problems.length > 0) {
  console.warn(`\nWeak password — consider: ${problems.join(", ")}.\n`)
}

console.log("\nAdd these to your .env file:\n")
console.log("INTERVIEW_ADMIN_EMAIL=hr@rayonweb.com")
console.log(`INTERVIEW_ADMIN_PASSWORD_HASH=${hashPassword(password)}`)
console.log("INTERVIEW_ADMIN_NAME=Rayon Web Admin")
console.log("\nThe plaintext password was not stored anywhere.\n")
