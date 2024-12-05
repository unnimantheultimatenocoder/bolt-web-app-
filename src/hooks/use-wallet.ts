import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { WalletService } from '@/lib/services/wallet.service';
import { useSupabase } from '@/components/providers/supabase-provider';
import { toast } from 'react-hot-toast';

export function useWallet() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabase();

  useEffect(() => {
    async function loadWalletData() {
      if (!user) return;

      try {
        const [walletBalance, transactionHistory] = await Promise.all([
          WalletService.getWalletBalance(user.id),
          WalletService.getTransactions(user.id)
        ]);

        setBalance(walletBalance);
        setTransactions(transactionHistory);
      } catch (error) {
        toast.error('Failed to load wallet data');
        console.error('Error loading wallet data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWalletData();
  }, [user]);

  const createTransaction = async (
    amount: number,
    type: Transaction['type'],
    referenceId: string
  ) => {
    if (!user) return;

    try {
      const newTransaction = await WalletService.createTransaction({
        user_id: user.id,
        amount,
        type,
        status: 'pending',
        reference_id: referenceId
      });

      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (error) {
      toast.error('Transaction failed');
      throw error;
    }
  };

  return {
    balance,
    transactions,
    loading,
    createTransaction
  };
}