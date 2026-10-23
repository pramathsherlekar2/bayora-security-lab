import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ljwhmacnnkfgvwvglxi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_ANON_KEY"; // Paste your actual Supabase anon key here

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
