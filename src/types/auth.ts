import { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
} 