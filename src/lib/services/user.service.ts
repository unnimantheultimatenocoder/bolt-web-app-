import { supabase } from '../supabase/config';
import { User } from '@/types';
import { withRetry } from '../utils/db-retry';

export class UserService {
  static async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
    );

    if (error) throw error;
    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await withRetry(() =>
      supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
    );

    if (error) throw error;
    return data;
  }

  static async updateGameId(userId: string, gameId: string) {
    const { error } = await withRetry(() =>
      supabase
        .from('users')
        .update({ game_id: gameId })
        .eq('id', userId)
    );

    if (error) throw error;
  }
}