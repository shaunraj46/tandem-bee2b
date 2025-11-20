-- Add flexible settings to rounds table
ALTER TABLE rounds ADD COLUMN IF NOT EXISTS group_size INTEGER DEFAULT 4;
ALTER TABLE rounds ADD COLUMN IF NOT EXISTS minutes_per_round INTEGER DEFAULT 8;

-- Remove fixed settings from events table if they exist
ALTER TABLE events DROP COLUMN IF EXISTS group_size;
ALTER TABLE events DROP COLUMN IF EXISTS minutes_per_round;
