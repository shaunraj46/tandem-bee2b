export interface Event {
  id: string;
  code: string;
  name: string;
  date: string;
  rounds: number;
  minutes_per_round: number;
  group_size: number;
  status: 'lobby' | 'active' | 'ended';
  current_round: number;
  organizer_email: string;
  created_at: string;
}

export interface Participant {
  id: string;
  event_id: string;
  name: string;
  company: string;
  role: string;
  offers: string[];
  seeks: string[];
  industries: string[];
  bio?: string;
  joined_at: string;
}

export interface Round {
  id: string;
  event_id: string;
  round_number: number;
  group_size: number;
  minutes_per_round: number;
  started_at: string;
  ended_at?: string;
}

export interface Group {
  id: string;
  event_id: string;
  round_id: string;
  group_name: string;
  group_number: number;
}

export interface GroupMember {
  id: string;
  group_id: string;
  participant_id: string;
}

export interface Save {
  id: string;
  event_id: string;
  round_id: string;
  from_participant_id: string;
  to_participant_id: string;
  timestamp: string;
}