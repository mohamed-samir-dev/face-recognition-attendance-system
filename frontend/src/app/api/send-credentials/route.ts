import { NextRequest, NextResponse } from 'next/server';
import { sendCredentialsEmail } from '@/lib/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const { name, email, username, password } = await request.json();

    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendCredentialsEmail({ name, email, username, password });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}