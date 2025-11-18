import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_code, name, company, role, offers, seeks, industries, bio } = body;

    // Find event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('code', event_code)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Add participant
    const { data: participant, error: participantError } = await supabase
      .from('participants')
      .insert({
        event_id: event.id,
        name,
        company,
        role,
        offers: offers || [],
        seeks: seeks || [],
        industries: industries || [],
        bio
      })
      .select()
      .single();

    if (participantError) throw participantError;

    return NextResponse.json({
      success: true,
      participant,
      event
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}