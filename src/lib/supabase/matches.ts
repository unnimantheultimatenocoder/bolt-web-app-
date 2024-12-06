import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Match, MatchCreate, MatchUpdate, MatchWithPlayers } from '@/types/match';
import { withRetry } from '@/lib/utils/db-retry';

const supabase = createClientComponentClient();

export async function getMatches(tournamentId: string) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('matches')
        .select(`
          *,
          player1:users!player1_id (id, username, game_id),
          player2:users!player2_id (id, username, game_id),
          winner:users!winner_id (id, username, game_id)
        `)
        .eq('tournament_id', tournamentId)
        .order('created_at', { ascending: true })
    );

    if (error) throw error;
    return { data: data as MatchWithPlayers[], error: null };
  } catch (error) {
    console.error('Error fetching matches:', error);
    return { data: null, error };
  }
}

export async function getMatchById(id: string) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('matches')
        .select(`
          *,
          player1:users!player1_id (id, username, game_id),
          player2:users!player2_id (id, username, game_id),
          winner:users!winner_id (id, username, game_id)
        `)
        .eq('id', id)
        .single()
    );

    if (error) throw error;
    return { data: data as MatchWithPlayers, error: null };
  } catch (error) {
    console.error('Error fetching match:', error);
    return { data: null, error };
  }
}

export async function createMatch(match: MatchCreate) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('matches')
        .insert(match)
        .select()
        .single()
    );

    if (error) throw error;
    return { data: data as Match, error: null };
  } catch (error) {
    console.error('Error creating match:', error);
    return { data: null, error };
  }
}

export async function updateMatch(id: string, updates: MatchUpdate) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('matches')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );

    if (error) throw error;
    return { data: data as Match, error: null };
  } catch (error) {
    console.error('Error updating match:', error);
    return { data: null, error };
  }
}

export async function deleteMatch(id: string) {
  try {
    const { error } = await withRetry(() => 
      supabase
        .from('matches')
        .delete()
        .eq('id', id)
    );

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting match:', error);
    return { error };
  }
}
