import { supabase } from '../supabase/config';
import { Tournament } from '@/types';
import { withRetry } from '../utils/db-retry';

export class TournamentService {
  static async getUpcomingTournaments(): Promise<Tournament[]> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('tournaments')
        .select('*')
        .eq('status', 'upcoming')
        .order('start_time', { ascending: true })
    );

    if (error) throw error;
    return data || [];
  }

  static async getTournamentById(id: string): Promise<Tournament | null> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single()
    );

    if (error) throw error;
    return data;
  }

  static async joinTournament(tournamentId: string, userId: string) {
    const { error } = await withRetry(() =>
      supabase.rpc('join_tournament', {
        p_tournament_id: tournamentId,
        p_user_id: userId
      })
    );

    if (error) throw error;
  }
}