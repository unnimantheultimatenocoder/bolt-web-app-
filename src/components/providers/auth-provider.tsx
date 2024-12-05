'use client';

import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuthStore } from '@/store/auth-store';
import type { User } from '@/types';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch additional user data from the database
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }

        // Transform the data to match our User type
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          username: userData?.username || null,
          wallet_balance: userData?.wallet_balance || 0,
          game_id: userData?.game_id || null,
          created_at: userData?.created_at || new Date().toISOString(),
          updated_at: userData?.updated_at || new Date().toISOString(),
        };

        setUser(user);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        router.push('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router, setUser]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}