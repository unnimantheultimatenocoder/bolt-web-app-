export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          id: string
          tournament_id: string
          player1_id: string
          player2_id: string
          winner_id: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'disputed'
          score: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          player1_id: string
          player2_id: string
          winner_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'disputed'
          score?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          player1_id?: string
          player2_id?: string
          winner_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'disputed'
          score?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          title: string
          game_type: string
          entry_fee: number
          prize_pool: number
          max_players: number
          current_players: number
          start_time: string
          status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          game_type: string
          entry_fee: number
          prize_pool: number
          max_players: number
          current_players?: number
          start_time: string
          status?: 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          game_type?: string
          entry_fee?: number
          prize_pool?: number
          max_players?: number
          current_players?: number
          start_time?: string
          status?: 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'deposit' | 'withdrawal' | 'entry_fee' | 'prize'
          status: 'pending' | 'completed' | 'failed'
          reference_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'deposit' | 'withdrawal' | 'entry_fee' | 'prize'
          status?: 'pending' | 'completed' | 'failed'
          reference_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'deposit' | 'withdrawal' | 'entry_fee' | 'prize'
          status?: 'pending' | 'completed' | 'failed'
          reference_id?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          username: string | null
          email: string
          wallet_balance: number
          game_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          email: string
          wallet_balance?: number
          game_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          email?: string
          wallet_balance?: number
          game_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}