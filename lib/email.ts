import { Resend } from 'resend';

// Initialize the Resend SDK
const resend = new Resend(process.env.RESEND_API_KEY);

const emailFrom = process.env.EMAIL_FROM || 'GatherDeck <support@gatherdeck.in>';
const emailTo = process.env.EMAIL_TO || 'support@gatherdeck.in';

export async function sendContactEmail({
  name,
  email,
  question,
}: {
  name: string;
  email: string;
  question: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: `${name} <${email}>`,
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
    });

    if (error) {
      console.error('Failed to send contact email via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error while sending contact email:', error);
    return { success: false, error };
  }
}

export async function sendBookingEmail({
  bookingDetails,
}: {
  bookingDetails: any; // Add proper type when implementing booking logic
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo, // Send to business owner or appropriate recipient
      subject: `New Booking Request`,
      text: `A new booking has been made: ${JSON.stringify(bookingDetails)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>New Booking Created</h2>
          <pre>${JSON.stringify(bookingDetails, null, 2)}</pre>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send booking email via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error while sending booking email:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject,
      text: body,
      html: `<div style="font-family: sans-serif; max-width: 600px; margin: auto;">${body}</div>`,
    });

    if (error) {
      console.error('Failed to send admin notification via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error while sending admin notification:', error);
    return { success: false, error };
  }
}
