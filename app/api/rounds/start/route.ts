import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { event_id, group_size, minutes_per_round } = await req.json();

    const { data: event } = await supabase
      .from('events')
      .select('*')
      .eq('id', event_id)
      .single();

    if (!event) throw new Error('Event not found');

    const nextRound = event.current_round + 1;

    const { data: round, error } = await supabase
  .from('rounds')
  .insert({
    event_id,
    round_number: nextRound,
    group_size: group_size || 4,
    minutes_per_round: minutes_per_round || 8,
    started_at: new Date().toISOString() // ✅ Add this!
  })
      .select()
      .single();

    if (error) {
      console.error('Error creating round:', error);
      throw error;
    }

    await supabase
      .from('events')
      .update({
        current_round: nextRound,
        status: 'active'
      })
      .eq('id', event_id);

    return NextResponse.json({ success: true, round });
  } catch (error: any) {
    console.error('Start round error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
