export interface Match {
  id: string;
  tournament_id: string;
  player1_id: string;
  player2_id: string | null;
  winner_id: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'disputed';
  score: string | null;
  created_at: string;
  updated_at: string;
}

export type MatchCreate = Omit<Match, 'id' | 'created_at' | 'updated_at'>;

export type MatchUpdate = Partial<Omit<Match, 'id' | 'tournament_id' | 'created_at' | 'updated_at'>>;

export interface MatchWithPlayers extends Match {
  player1: {
    id: string;
    username: string;
    game_id: string | null;
  };
  player2?: {
    id: string;
    username: string;
    game_id: string | null;
  };
  winner?: {
    id: string;
    username: string;
    game_id: string | null;
  };
}
