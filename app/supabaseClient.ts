import { createClient } from '@supabase/supabase-js';

// Direct keys injection taaki local system crash na kare
const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY"; // Apni Supabase wali lambi anon key yahan paste kar dena

export const supabase = createClient(supabaseUrl, supabaseAnonKey);