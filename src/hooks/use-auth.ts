'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { Database } from '@/lib/supabase/database.types';

export function useAuth() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Successfully signed in!');
      router.push('/tournaments');
      router.refresh();
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (signUpError) throw signUpError;

      toast.success('Registration successful! Please check your email to verify your account.');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Failed to register. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Successfully signed out!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Failed to sign out. Please try again.');
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}