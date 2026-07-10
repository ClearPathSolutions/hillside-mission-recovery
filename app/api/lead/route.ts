import { NextResponse } from "next/server";

// Lead / contact form endpoint.
// TODO(integration): forward submissions to the admissions team — e.g. email via
// Resend/SendGrid, or push into the CRM. For now we validate and acknowledge so the
// form works end-to-end; wire up delivery before going live.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, phone, email } = body ?? {};

    if (!firstName || !phone || !email) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Placeholder: log to server output. Replace with real delivery.
    console.log("New lead:", JSON.stringify(body));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
