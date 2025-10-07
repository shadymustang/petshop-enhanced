import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body?.name || !body?.phone || !body?.petType || !body?.date || !body?.time) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // In a real app, you'd store to DB or notify a webhook/email here.
    const bookingId = `BK-${Date.now()}`;

    // For demonstration we simply return success and echo the booking
    return NextResponse.json({ ok: true, bookingId, booking: body });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
