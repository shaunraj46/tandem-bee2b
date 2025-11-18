import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { event_id } = await req.json();

    // Get current event
    const { data: event } = await supabase
      .from('events')
      .select('*')
      .eq('id', event_id)
      .single();

    if (!event) throw new Error('Event not found');

    const nextRound = event.current_round + 1;

    // Create new round
    const { data: round, error } = await supabase
      .from('rounds')
      .insert({
        event_id,
        round_number: nextRound
      })
      .select()
      .single();

    if (error) throw error;

    // Update event
    await supabase
      .from('events')
      .update({
        current_round: nextRound,
        status: 'active'
      })
      .eq('id', event_id);

    return NextResponse.json({ success: true, round });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}