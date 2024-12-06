export interface Tournament {
  id: string;
  title: string;
  game_type: string;
  entry_fee: number;
  prize_pool: number;
  max_players: number;
  current_players: number;
  start_time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export type TournamentCreate = Omit<Tournament, 'id' | 'current_players' | 'created_at' | 'updated_at'>;

export type TournamentUpdate = Partial<Omit<Tournament, 'id' | 'created_at' | 'updated_at'>>;

export interface TournamentWithMatches extends Tournament {
  matches: Match[];
}
