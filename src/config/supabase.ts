import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const SUPABASE_TABLES = {
  PROFILES: 'profiles',
  LINKS: 'links',
  SOCIAL_LINKS: 'social_links',
};
