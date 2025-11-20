import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ADD THIS: Check if keys exist in the browser
if (typeof window !== 'undefined') {
  console.log('Supabase Client Init:', {
    url: supabaseUrl,
    keyLength: supabaseKey?.length || 0 // Don't log the full key, just length
  });
}

export const supabase = createClient(supabaseUrl, supabaseKey);