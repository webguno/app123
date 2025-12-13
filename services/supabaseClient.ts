import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production environment, these should be in a .env file
// e.g. process.env.REACT_APP_SUPABASE_URL
// For this demo to work, we have added your provided credentials below.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://adoxykmujrsemrsqbmgh.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_KH-gQg0jfvcvrjiGd0TcwQ_mf-gD5DA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);