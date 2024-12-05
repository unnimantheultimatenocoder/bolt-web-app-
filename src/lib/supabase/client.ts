import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';

export function createClientSupabaseClient() {
  return createClientComponentClient<Database>();
}