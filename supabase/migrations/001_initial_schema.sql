-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(6) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  rounds INTEGER DEFAULT 4,
  status VARCHAR(20) DEFAULT 'lobby',
  current_round INTEGER DEFAULT 0,
  organizer_email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Participants table
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  offers TEXT[] DEFAULT '{}',
  seeks TEXT[] DEFAULT '{}',
  industries TEXT[] DEFAULT '{}',
  bio TEXT,
  joined_at TIMESTAMP DEFAULT NOW()
);

-- Rounds table
CREATE TABLE IF NOT EXISTS rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  group_size INTEGER DEFAULT 4,
  minutes_per_round INTEGER DEFAULT 8,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_id UUID REFERENCES rounds(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  group_number INTEGER NOT NULL
);

-- Group members junction table
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  UNIQUE(group_id, participant_id)
);

-- Saves table
CREATE TABLE IF NOT EXISTS saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_id UUID REFERENCES rounds(id) ON DELETE CASCADE,
  from_participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  to_participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(round_id, from_participant_id, to_participant_id)
);

-- Indexes for better performance
CREATE INDEX idx_participants_event ON participants(event_id);
CREATE INDEX idx_rounds_event ON rounds(event_id);
CREATE INDEX idx_groups_round ON groups(round_id);
CREATE INDEX idx_group_members_group ON group_members(group_id);
CREATE INDEX idx_group_members_participant ON group_members(participant_id);
CREATE INDEX idx_saves_event ON saves(event_id);
