export interface User {
  id: string;
  username: string | null;
  email: string;
  wallet_balance: number;
  game_id: string | null;
  created_at: string;
  updated_at: string;
}

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

export interface Match {
  id: string;
  tournament_id: string;
  player1_id: string;
  player2_id: string;
  winner_id: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'disputed';
  score: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'entry_fee' | 'prize';
  status: 'pending' | 'completed' | 'failed';
  reference_id: string;
  created_at: string;
}