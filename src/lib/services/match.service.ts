import { supabase } from '../supabase/config';
import { Match } from '@/types';
import { withRetry } from '../utils/db-retry';

export class MatchService {
  static async getUserMatches(userId: string): Promise<Match[]> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('matches')
        .select('*')
        .or(`player1_id.eq.${userId},player2_id.eq.${userId}`)
        .order('created_at', { ascending: false })
    );

    if (error) throw error;
    return data || [];
  }

  static async getMatchById(id: string): Promise<Match | null> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('matches')
        .select('*')
        .eq('id', id)
        .single()
    );

    if (error) throw error;
    return data;
  }

  static async updateMatchStatus(
    matchId: string,
    status: Match['status'],
    score?: string
  ) {
    const { error } = await withRetry(() =>
      supabase
        .from('matches')
        .update({ status, score })
        .eq('id', matchId)
    );

    if (error) throw error;
  }
}