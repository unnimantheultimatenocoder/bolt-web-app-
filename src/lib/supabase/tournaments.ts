import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Tournament, TournamentCreate, TournamentUpdate, TournamentWithMatches } from '@/types/tournament';
import { withRetry } from '@/lib/utils/db-retry';

const supabase = createClientComponentClient();

export async function getTournaments() {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('tournaments')
        .select('*')
        .order('start_time', { ascending: true })
    );

    if (error) throw error;
    return { data: data as Tournament[], error: null };
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return { data: null, error };
  }
}

export async function getTournamentById(id: string) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('tournaments')
        .select(`
          *,
          matches (
            *,
            player1:users!player1_id (id, username, game_id),
            player2:users!player2_id (id, username, game_id),
            winner:users!winner_id (id, username, game_id)
          )
        `)
        .eq('id', id)
        .single()
    );

    if (error) throw error;
    return { data: data as TournamentWithMatches, error: null };
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return { data: null, error };
  }
}

export async function createTournament(tournament: TournamentCreate) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('tournaments')
        .insert(tournament)
        .select()
        .single()
    );

    if (error) throw error;
    return { data: data as Tournament, error: null };
  } catch (error) {
    console.error('Error creating tournament:', error);
    return { data: null, error };
  }
}

export async function updateTournament(id: string, updates: TournamentUpdate) {
  try {
    const { data, error } = await withRetry(() => 
      supabase
        .from('tournaments')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );

    if (error) throw error;
    return { data: data as Tournament, error: null };
  } catch (error) {
    console.error('Error updating tournament:', error);
    return { data: null, error };
  }
}

export async function deleteTournament(id: string) {
  try {
    const { error } = await withRetry(() => 
      supabase
        .from('tournaments')
        .delete()
        .eq('id', id)
    );

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting tournament:', error);
    return { error };
  }
}
