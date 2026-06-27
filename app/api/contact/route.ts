import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, question } = await req.json();

    if (!name || !email || !question) {
      return NextResponse.json(
        { error: 'Name, email, and question are required' },
        { status: 400 }
      );
    }

    // Titan Mail (and most hosted SMTP servers) require 'from' to match
    // the authenticated SMTP_USER. Using the visitor's email as 'from'
    // causes an authentication/relay rejection → 500.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.titan.email',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      // Must be the authenticated sender, not the visitor's email
      from: `"GatherDeck Support" <${process.env.SMTP_USER}>`,
      // Replies will go to the user who submitted the form
      replyTo: `"${name}" <${email}>`,
      to: 'support@gatherdeck.in',
      subject: `New Support Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nQuestion:\n${question}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>New Support Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <h3>Message / Question:</h3>
          <p style="white-space: pre-wrap;">${question}</p>
        </div>
      `,
    };

    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn('SMTP_USER is not set. Skipping email for local dev.');
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return NextResponse.json(
      { message: 'Support request sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form SMTP error:', {
      message: error?.message,
      code: error?.code,
      response: error?.response,
      responseCode: error?.responseCode,
    });
    return NextResponse.json(
      { error: 'Failed to send support request' },
      { status: 500 }
    );
  }
}
