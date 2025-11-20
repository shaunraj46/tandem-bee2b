import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { matchParticipantsWithLLM } from '@/lib/llm-matcher';

export async function POST(req: NextRequest) {
  try {
    const { round_id, event_id, group_size } = await req.json();

    const { data: participants } = await supabase
      .from('participants')
      .select('*')
      .eq('event_id', event_id);

    if (!participants || participants.length === 0) {
      throw new Error('No participants found');
    }

    const { data: previousGroups } = await supabase
      .from('group_members')
      .select('participant_id, group_id, groups!inner(round_id)')
      .eq('groups.event_id', event_id);

    const previousGroupMap: { [key: string]: string[] } = {};
    previousGroups?.forEach(gm => {
      if (!previousGroupMap[gm.participant_id]) {
        previousGroupMap[gm.participant_id] = [];
      }
      previousGroups
        ?.filter(pg => pg.group_id === gm.group_id && pg.participant_id !== gm.participant_id)
        .forEach(pg => {
          if (!previousGroupMap[gm.participant_id].includes(pg.participant_id)) {
            previousGroupMap[gm.participant_id].push(pg.participant_id);
          }
        });
    });

    console.log('Asking Claude to create groups...');
    const groupAssignment = await matchParticipantsWithLLM(
      participants,
      group_size || 4,
      previousGroupMap
    );

    for (const group of groupAssignment.groups) {
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert({
          event_id,
          round_id,
          group_name: group.group_name,
          group_number: group.group_number
        })
        .select()
        .single();

      if (groupError) throw groupError;

      const members = group.participant_ids.map(participant_id => ({
        group_id: groupData.id,
        participant_id
      }));

      const { error: membersError } = await supabase
        .from('group_members')
        .insert(members);

      if (membersError) throw membersError;
    }

    return NextResponse.json({
      success: true,
      groups: groupAssignment.groups
    });
  } catch (error: any) {
    console.error('Matching error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
