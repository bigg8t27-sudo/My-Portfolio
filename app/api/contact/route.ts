import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// Basic email regex — same pattern used client-side
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();
    const { name, email, subject, message } = body;

    // ── Server-side validation ─────────────────────────────
    if (!name?.trim())                      return NextResponse.json({ error: 'Name is required.' },           { status: 400 });
    if (!email?.trim())                     return NextResponse.json({ error: 'Email is required.' },          { status: 400 });
    if (!EMAIL_RE.test(email))              return NextResponse.json({ error: 'Invalid email address.' },      { status: 400 });
    if (!subject?.trim())                   return NextResponse.json({ error: 'Subject is required.' },        { status: 400 });
    if ((message?.trim() ?? '').length < 10) return NextResponse.json({ error: 'Message too short (min 10 chars).' }, { status: 400 });

    const resendKey = process.env.RESEND_API_KEY;

    // ── No API key: log locally and return success ─────────
    // Useful in dev / when Resend is not yet configured.
    if (!resendKey) {
      console.log('[Contact form — dev mode]', { name, email, subject, message });
      return NextResponse.json({ ok: true, dev: true });
    }

    // ── Send via Resend ────────────────────────────────────
    // Uses the Resend REST API directly — no SDK dependency needed.
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        // "from" must be a verified domain in your Resend account.
        // Replace with your own verified sender once set up.
        from:    'Portfolio <onboarding@resend.dev>',
        to:      ['bigg8t27@gmail.com'],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a1a;color:#e5e7eb;border-radius:12px;border:1px solid #1e293b">
            <h2 style="color:#3b82f6;margin:0 0 16px">New message from your portfolio</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#94a3b8;width:80px">Name</td><td style="padding:6px 0;font-weight:600">${escHtml(name)}</td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Email</td><td style="padding:6px 0"><a href="mailto:${escHtml(email)}" style="color:#60a5fa">${escHtml(email)}</a></td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Subject</td><td style="padding:6px 0">${escHtml(subject)}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #1e293b;margin:16px 0"/>
            <p style="white-space:pre-wrap;line-height:1.7;margin:0">${escHtml(message)}</p>
          </div>
        `,
        text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[Resend error]', err);
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please email bigg8t27@gmail.com directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[Contact route error]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email bigg8t27@gmail.com directly.' },
      { status: 500 },
    );
  }
}

// ── Helpers ───────────────────────────────────────────────
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
