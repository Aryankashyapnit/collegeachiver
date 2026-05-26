import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Ye check lagao taaki humein pata chale error kahan hai
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase keys missing! .env.local check karo.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);