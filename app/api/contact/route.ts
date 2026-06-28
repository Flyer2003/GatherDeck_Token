import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, question } = await req.json();

    if (!name || !email || !question) {
      return NextResponse.json(
        { error: 'Name, email, and question are required' },
        { status: 400 }
      );
    }

    // Call the reusable email utility (which handles its own errors safely)
    const emailResult = await sendContactEmail({ name, email, question });

    if (!emailResult.success) {
      console.warn('Contact form email sending failed, but proceeding with success response for the user.', emailResult.error);
      // We don't fail the request here, per the requirements.
    }

    return NextResponse.json(
      { message: 'Support request sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form submission error:', {
      message: error?.message,
    });
    
    // As per requirements, we never crash the request because email sending failed, 
    // but if the actual parsing/validation failed, we return a 500. 
    return NextResponse.json(
      { error: 'Failed to process support request' },
      { status: 500 }
    );
  }
}
