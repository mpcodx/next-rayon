import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import formidable from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

const EMAIL_USER = process.env.EMAIL_USER || "rayonwebsolutions@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "admubkeunwdrhxgi";
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Rayon Web Solutions";

const isValidEmail = (value?: string) => Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let subject: string = "New Inquiry";
    let message: string = "";
    let replyTo: string | undefined;
    let senderName: string | undefined;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      subject = body.subject || "New Inquiry";
      message = body.message || "";
      replyTo = body.replyTo || body.email;
      senderName = body.name;
    } else if (contentType.includes("multipart/form-data")) {
      const form = new formidable.IncomingForm();
      const formData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(req as any, (err: any, fields: any, files: any) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
      subject = formData.fields.subject || "New Inquiry";
      message = formData.fields.message || "";
      replyTo = formData.fields.replyTo || formData.fields.email;
      senderName = formData.fields.name;
    } else {
      return NextResponse.json({ message: "Unsupported Content-Type" }, { status: 400 });
    }

    const normalizedReplyTo = isValidEmail(replyTo) ? replyTo : undefined;
    const normalizedSenderName = senderName?.trim() || "Website Visitor";
    const messageWithMeta = `Submitted By: ${normalizedSenderName}\nReply Email: ${normalizedReplyTo || "Not provided"}\n\n${message}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `${EMAIL_FROM_NAME} <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject,
      text: messageWithMeta,
      replyTo: normalizedReplyTo,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json({ message: "Failed to send email", error: err.message }, { status: 500 });
  }
}
