-- Remove fixed group_size and minutes_per_round from events
ALTER TABLE events DROP COLUMN IF EXISTS group_size;
ALTER TABLE events DROP COLUMN IF EXISTS minutes_per_round;

-- Add flexible settings to rounds table
ALTER TABLE rounds ADD COLUMN IF NOT EXISTS group_size INTEGER DEFAULT 4;
ALTER TABLE rounds ADD COLUMN IF NOT EXISTS minutes_per_round INTEGER DEFAULT 8;
