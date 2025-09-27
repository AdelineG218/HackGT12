import { createClient } from "@supabase/supabase-js";
const URL = 'https://ljytosovnvqzzxhjpypi.supabase.co';
const SUPERBASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(URL, SUPERBASE_KEY);