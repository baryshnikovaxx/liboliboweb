import { NextResponse } from "next/server";

type LeadPayload = {
  locale?: string;
  page?: string;
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

function sanitize(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    const locale = sanitize(payload.locale) || "unknown";
    const page = sanitize(payload.page) || "unknown";
    const name = sanitize(payload.name);
    const company = sanitize(payload.company);
    const email = sanitize(payload.email);
    const message = sanitize(payload.message);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ ok: false, error: "telegram_not_configured" }, { status: 500 });
    }

    const text = [
      "New lead from website",
      "",
      `Locale: ${locale}`,
      `Page: ${page}`,
      `Name: ${name}`,
      `Company: ${company || "-"}`,
      `Email: ${email}`,
      "Message:",
      message,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      return NextResponse.json({ ok: false, error: "telegram_send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

