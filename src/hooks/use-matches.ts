import { useState, useEffect } from 'react';
import { Match } from '@/types';
import { MatchService } from '@/lib/services/match.service';
import { useSupabase } from '@/components/providers/supabase-provider';
import { toast } from 'react-hot-toast';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabase();

  useEffect(() => {
    async function loadMatches() {
      if (!user) return;

      try {
        const data = await MatchService.getUserMatches(user.id);
        setMatches(data);
      } catch (error) {
        toast.error('Failed to load matches');
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [user]);

  return { matches, loading };
}