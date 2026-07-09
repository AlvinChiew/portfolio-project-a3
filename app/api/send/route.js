import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req) {
  const fromEmail = process.env.FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!process.env.RESEND_API_KEY || !fromEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, subject, message } = await req.json();
  const body = {
    from: fromEmail,
    to: [email],
    bcc: [adminEmail],
    subject: subject,
    react: (
      <>
        <h1>{subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>{message}</p>
      </>
    ),
  };
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
