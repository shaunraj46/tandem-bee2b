import Anthropic from '@anthropic-ai/sdk';
import { Participant } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface GroupAssignment {
  groups: {
    group_number: number;
    group_name: string;
    participant_ids: string[];
    reasoning: string;
  }[];
}

export async function matchParticipantsWithLLM(
  participants: Participant[],
  groupSize: number,
  previousGroups: { [participantId: string]: string[] } = {}
): Promise<GroupAssignment> {
  
  // Prepare participant data for LLM
  const participantData = participants.map(p => ({
    id: p.id,
    name: p.name,
    company: p.company,
    role: p.role,
    offers: p.offers,
    seeks: p.seeks,
    industries: p.industries,
    previously_grouped_with: previousGroups[p.id] || []
  }));

  const prompt = `You are an expert networking event coordinator. Your job is to create optimal groups for a networking session.

**Participants (${participants.length} total):**
${JSON.stringify(participantData, null, 2)}

**Rules:**
1. Each group must have exactly ${groupSize} people
2. Maximize complementary matches: pair people whose "seeks" match others' "offers"
3. Prioritize diversity: avoid same company in a group
4. Avoid repeat groupings: people in "previously_grouped_with" should not be grouped again if possible
5. Give each group a fun, memorable name (e.g., "Blue Lions", "Red Dragons", "Green Foxes")

**Output Format (JSON only):**
{
  "groups": [
    {
      "group_number": 1,
      "group_name": "Blue Lions",
      "participant_ids": ["uuid1", "uuid2", "uuid3", "uuid4"],
      "reasoning": "Sarah seeks AI talent and Marcus offers ML expertise. Julia needs design help and Raj offers UX skills."
    }
  ]
}

IMPORTANT: 
- Return ONLY valid JSON
- Ensure every participant is assigned to exactly one group
- If participants don't divide evenly, the last group can have ${groupSize - 1} or ${groupSize + 1} people
- DO NOT include any text outside the JSON structure`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // Strip markdown code blocks if present
    const jsonText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const result: GroupAssignment = JSON.parse(jsonText);

    // Validate: check all participants are assigned
    const assignedIds = new Set(
      result.groups.flatMap(g => g.participant_ids)
    );
    const allIds = new Set(participants.map(p => p.id));

    if (assignedIds.size !== allIds.size) {
      throw new Error('Not all participants were assigned to groups');
    }

    return result;

  } catch (error) {
    console.error('LLM matching failed:', error);
    
    // Fallback: simple random grouping
    return fallbackGrouping(participants, groupSize);
  }
}

// Fallback if LLM fails
function fallbackGrouping(
  participants: Participant[], 
  groupSize: number
): GroupAssignment {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const groups: GroupAssignment['groups'] = [];
  
  for (let i = 0; i < shuffled.length; i += groupSize) {
    const groupMembers = shuffled.slice(i, i + groupSize);
    groups.push({
      group_number: groups.length + 1,
      group_name: `Group ${groups.length + 1}`,
      participant_ids: groupMembers.map(p => p.id),
      reasoning: 'Random assignment (fallback)'
    });
  }
  
  return { groups };
}