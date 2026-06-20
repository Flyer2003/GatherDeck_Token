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

    // Configure your SMTP transporter
    // For production, these should be securely stored in process.env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      replyTo: email,
      to: 'support@gatherdeck.in', // list of receivers
      subject: `New Support Request from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nQuestion:\n${question}`, // plain text body
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>New Support Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <h3>Message / Question:</h3>
          <p style="white-space: pre-wrap;">${question}</p>
        </div>
      `, // html body
    };

    // Only attempt to send if SMTP_USER is set, otherwise mock success for local dev if they haven't configured it yet
    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP_USER is not set. Mocking email delivery successfully for local testing.");
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json(
      { message: 'Support request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send support request' },
      { status: 500 }
    );
  }
}
