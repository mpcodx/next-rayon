import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const EMAIL_USER = process.env.EMAIL_USER || ""
const EMAIL_PASS = process.env.EMAIL_PASS || ""
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Rayon Web Solutions"

const isValidEmail = (value?: string) => Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))

const asString = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "")

type MailPayload = {
  subject: string
  message: string
  replyTo?: string
  name?: string
}

async function parsePayload(req: NextRequest): Promise<MailPayload | null> {
  const contentType = req.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    const body = await req.json()
    return {
      subject: body?.subject || "New Inquiry",
      message: body?.message || "",
      replyTo: body?.replyTo || body?.email,
      name: body?.name,
    }
  }

  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    const form = await req.formData()
    return {
      subject: asString(form.get("subject")) || "New Inquiry",
      message: asString(form.get("message")),
      replyTo: asString(form.get("replyTo")) || asString(form.get("email")) || undefined,
      name: asString(form.get("name")) || undefined,
    }
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ message: "Email service is not configured" }, { status: 500 })
    }

    const payload = await parsePayload(req)
    if (!payload) {
      return NextResponse.json({ message: "Unsupported Content-Type" }, { status: 400 })
    }

    const normalizedReplyTo = isValidEmail(payload.replyTo) ? payload.replyTo : undefined
    const normalizedSenderName = payload.name?.trim() || "Website Visitor"
    const messageWithMeta = `Submitted By: ${normalizedSenderName}\nReply Email: ${normalizedReplyTo || "Not provided"}\n\n${payload.message}`

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    })

    await transporter.sendMail({
      from: `${EMAIL_FROM_NAME} <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: payload.subject,
      text: messageWithMeta,
      replyTo: normalizedReplyTo,
    })

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    console.error("Email error:", err)
    return NextResponse.json({ message: "Failed to send email", error: errorMessage }, { status: 500 })
  }
}
