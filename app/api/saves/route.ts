import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { event_id, round_id, from_participant_id, to_participant_id } = await req.json();

    const { data, error } = await supabase
      .from('saves')
      .insert({
        event_id,
        round_id,
        from_participant_id,
        to_participant_id
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, save: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}