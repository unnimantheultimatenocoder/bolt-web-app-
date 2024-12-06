import { create } from 'zustand';
import type { Tournament, TournamentWithMatches } from '@/types/tournament';

interface TournamentState {
  tournaments: Tournament[];
  currentTournament: TournamentWithMatches | null;
  isLoading: boolean;
  error: Error | null;
  setTournaments: (tournaments: Tournament[]) => void;
  setCurrentTournament: (tournament: TournamentWithMatches | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  addTournament: (tournament: Tournament) => void;
  updateTournament: (tournament: Tournament) => void;
  removeTournament: (id: string) => void;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournaments: [],
  currentTournament: null,
  isLoading: false,
  error: null,
  setTournaments: (tournaments) => set({ tournaments }),
  setCurrentTournament: (tournament) => set({ currentTournament: tournament }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addTournament: (tournament) => 
    set((state) => ({ tournaments: [...state.tournaments, tournament] })),
  updateTournament: (tournament) =>
    set((state) => ({
      tournaments: state.tournaments.map((t) => 
        t.id === tournament.id ? tournament : t
      ),
      currentTournament: state.currentTournament?.id === tournament.id 
        ? { ...state.currentTournament, ...tournament }
        : state.currentTournament
    })),
  removeTournament: (id) =>
    set((state) => ({
      tournaments: state.tournaments.filter((t) => t.id !== id),
      currentTournament: state.currentTournament?.id === id 
        ? null 
        : state.currentTournament
    })),
}));
