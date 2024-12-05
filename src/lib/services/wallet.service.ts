import { supabase } from '../supabase/config';
import { Transaction } from '@/types';
import { withRetry } from '../utils/db-retry';

export class WalletService {
  static async getTransactions(userId: string): Promise<Transaction[]> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    );

    if (error) throw error;
    return data || [];
  }

  static async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>) {
    const { data, error } = await withRetry(() =>
      supabase
        .from('transactions')
        .insert(transaction)
        .select()
        .single()
    );

    if (error) throw error;
    return data;
  }

  static async getWalletBalance(userId: string): Promise<number> {
    const { data, error } = await withRetry(() =>
      supabase
        .from('users')
        .select('wallet_balance')
        .eq('id', userId)
        .single()
    );

    if (error) throw error;
    return data?.wallet_balance || 0;
  }
}