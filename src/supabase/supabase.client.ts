import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zsvfvfczfcairhndsejf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmZ2ZmN6ZmNhaXJobmRzZWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDM3OTIsImV4cCI6MjA2MTMxOTc5Mn0.TnTfwCmwBWfhi9_C-k99IlKoC97bSL-oeVEUhBWnC4I';

export const supabase = createClient(supabaseUrl, supabaseKey);
