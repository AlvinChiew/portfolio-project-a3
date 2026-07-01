import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function issueActivationCode(email) {
  const issueUrl = process.env.ACTIVATION_ISSUE_URL;
  const issueApiKey = process.env.ACTIVATION_ISSUE_API_KEY;

  if (!issueUrl || !issueApiKey) {
    return null;
  }

  const response = await fetch(issueUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${issueApiKey}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to issue activation code');
  }

  const data = await response.json();
  return data.code ?? null;
}

export async function POST(req) {
  const fromEmail = process.env.FROM_EMAIL;
  const resend = getResend();
  const { name, email, company, industry } = await req.json();

  if (
    !name?.trim() ||
    !email?.trim() ||
    !company?.trim() ||
    !industry?.trim()
  ) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid business email.' },
      { status: 400 },
    );
  }

  if (!resend || !fromEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 },
    );
  }

  let activationCode = null;

  try {
    activationCode = await issueActivationCode(email.trim());
  } catch (error) {
    console.error('Activation issue failed:', error);
    return NextResponse.json(
      { error: 'Unable to issue activation code. Please try again later.' },
      { status: 502 },
    );
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [fromEmail],
      subject: `[Project A3] New activation sign-up — ${name}`,
      react: (
        <>
          <h1>New activation sign-up</h1>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Company:</strong> {company}
          </p>
          <p>
            <strong>Industry:</strong> {industry}
          </p>
          {activationCode ? (
            <p>
              <strong>Issued code:</strong> {activationCode}
            </p>
          ) : (
            <p>
              Phase A: issue activation code manually until validator is
              deployed.
            </p>
          )}
        </>
      ),
    });

    if (activationCode) {
      await resend.emails.send({
        from: fromEmail,
        to: [email.trim()],
        subject: 'Your Project A3 activation code',
        react: (
          <>
            <h1>Free Activation Code</h1>
            <p>Thanks for signing up for Auto Email.</p>
            <p>
              Activation code: <strong>{activationCode}</strong>
            </p>
            <p>Enter this code in the app to unlock full access.</p>
          </>
        ),
      });
    } else {
      await resend.emails.send({
        from: fromEmail,
        to: [email.trim()],
        subject: 'Project A3 — activation code on the way',
        react: (
          <>
            <h1>Thanks for signing up</h1>
            <p>
              Thanks for signing up for Auto Email — free activation code is on
              its way. We&apos;ll email you shortly with your code.
            </p>
            <p>Made Simple, For Business.</p>
          </>
        ),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sign-up email failed:', error);
    return NextResponse.json(
      { error: 'Unable to send confirmation email.' },
      { status: 500 },
    );
  }
}
