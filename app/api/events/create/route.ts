import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function generateEventCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, date, rounds, organizer_email } = body;

    const code = generateEventCode();

    const { data, error } = await supabase
      .from('events')
      .insert({
        code,
        name,
        date,
        rounds: rounds || 4,
        organizer_email,
        status: 'lobby'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, event: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
