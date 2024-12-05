import { useState, useEffect } from 'react';
import { Tournament } from '@/types';
import { TournamentService } from '@/lib/services/tournament.service';
import { toast } from 'react-hot-toast';

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTournaments() {
      try {
        const data = await TournamentService.getUpcomingTournaments();
        setTournaments(data);
      } catch (error) {
        toast.error('Failed to load tournaments');
        console.error('Error loading tournaments:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTournaments();
  }, []);

  return { tournaments, loading };
}