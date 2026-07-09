import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  BLOCKED_SIGNUP_EMAIL_MESSAGE,
  isBlockedSignupEmail,
  isHoneypotTriggered,
} from '../../lib/signupValidation';

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

function isValidCompanySize(value) {
  const trimmed = value?.trim();
  if (!trimmed || !/^\d+$/.test(trimmed)) {
    return false;
  }
  return Number(trimmed) >= 1;
}

async function issueActivationCode(profile) {
  const issueUrl = process.env.ACTIVATION_ISSUE_URL;
  const issueApiKey = process.env.ACTIVATION_ISSUE_API_KEY;

  if (!issueUrl || !issueApiKey) {
    throw new Error('Activation service is not configured.');
  }

  const response = await fetch(issueUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${issueApiKey}`,
    },
    body: JSON.stringify({
      name: profile.name,
      job_role: profile.job_role,
      company: profile.company,
      company_size: profile.company_size,
      industry: profile.industry,
      email: profile.email,
      sourced_from: profile.sourced_from,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || 'Failed to issue activation code');
  }

  const data = await response.json();
  return data.code ?? null;
}

export async function POST(req) {
  const fromEmail = process.env.FROM_EMAIL;
  const resend = getResend();
  const {
    name,
    email,
    job_role,
    company,
    company_size,
    industry,
    sourced_from,
    website,
  } = await req.json();

  if (isHoneypotTriggered(website)) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 400 },
    );
  }

  if (
    !name?.trim() ||
    !email?.trim() ||
    !job_role?.trim() ||
    !company?.trim() ||
    !company_size?.trim() ||
    !industry?.trim() ||
    !sourced_from?.trim()
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

  if (isBlockedSignupEmail(email)) {
    return NextResponse.json(
      { error: BLOCKED_SIGNUP_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  if (!isValidCompanySize(company_size)) {
    return NextResponse.json(
      { error: 'Company size must be a whole number.' },
      { status: 400 },
    );
  }

  const profile = {
    name: name.trim(),
    email: email.trim(),
    job_role: job_role.trim(),
    company: company.trim(),
    company_size: company_size.trim(),
    industry: industry.trim(),
    sourced_from: sourced_from.trim(),
  };

  let activationCode = null;

  try {
    activationCode = await issueActivationCode(profile);
  } catch (error) {
    console.error('Activation issue failed:', error);
    return NextResponse.json(
      {
        error:
          error.message === 'Activation service is not configured.'
            ? 'Activation service is not configured.'
            : 'Unable to issue activation code. Please try again later.',
      },
      { status: 502 },
    );
  }

  if (!activationCode) {
    return NextResponse.json(
      { error: 'Unable to issue activation code. Please try again later.' },
      { status: 502 },
    );
  }

  if (resend && fromEmail) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: [fromEmail],
        subject: `[Project A3] New activation sign-up — ${profile.name}`,
        react: (
          <>
            <h1>New activation sign-up</h1>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Job role:</strong> {profile.job_role}
            </p>
            <p>
              <strong>Company:</strong> {profile.company}
            </p>
            <p>
              <strong>Company size:</strong> {profile.company_size}
            </p>
            <p>
              <strong>Industry:</strong> {profile.industry}
            </p>
            <p>
              <strong>How they heard about us:</strong> {profile.sourced_from}
            </p>
            <p>
              <strong>Issued code:</strong> {activationCode}
            </p>
          </>
        ),
      });

      await resend.emails.send({
        from: fromEmail,
        to: [profile.email],
        subject: 'Your Project A3 activation code',
        react: (
          <>
            <h1>Free Activation Code</h1>
            <p>Thanks for signing up for Project A3.</p>
            <p>
              Activation code: <strong>{activationCode}</strong>
            </p>
            <p>Enter this code in the any tool to unlock full access.</p>
          </>
        ),
      });
    } catch (error) {
      console.error('Sign-up email failed:', error);
    }
  }

  return NextResponse.json({ success: true });
}
