'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuthStore } from '@/store/auth-store';
import type { User } from '@/types';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

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
      } catch (error) {
        console.error('Error loading auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}