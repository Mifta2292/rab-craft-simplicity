// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ipbpzgkwpythsfdbvkcf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYnB6Z2t3cHl0aHNmZGJ2a2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzExMjUsImV4cCI6MjA1NzgwNzEyNX0.21tm1pyvcN6LXd-gHuK4sTsQ_Q8w3qYL2aOJPcEUwTY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);