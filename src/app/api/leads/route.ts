import { NextResponse } from "next/server";

type LeadPayload = {
  locale?: string;
  page?: string;
  name?: string;
  company?: string;
  email?: string;
  contact?: string;
  message?: string;
};

function sanitize(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateTelegramHandle(contact: string) {
  return /^@[a-zA-Z0-9_]{5,32}$/.test(contact);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    const locale = sanitize(payload.locale) || "unknown";
    const page = sanitize(payload.page) || "unknown";
    const name = sanitize(payload.name);
    const company = sanitize(payload.company);
    const email = sanitize(payload.email);
    const contact = sanitize(payload.contact);
    const contactValue = contact || email;
    const message = sanitize(payload.message);

    if (!name || !contactValue || !message) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }

    const contactIsValid = validateEmail(contactValue) || validateTelegramHandle(contactValue);
    if (!contactIsValid) {
      return NextResponse.json({ ok: false, error: "invalid_contact" }, { status: 400 });
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
      `Contact: ${contactValue}`,
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

    const telegramData = (await telegramResponse.json()) as { ok?: boolean };
    if (!telegramData.ok) {
      return NextResponse.json({ ok: false, error: "telegram_send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

