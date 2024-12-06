import { create } from 'zustand';
import type { Match, MatchWithPlayers } from '@/types/match';

interface MatchState {
  matches: Match[];
  currentMatch: MatchWithPlayers | null;
  isLoading: boolean;
  error: Error | null;
  setMatches: (matches: Match[]) => void;
  setCurrentMatch: (match: MatchWithPlayers | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  addMatch: (match: Match) => void;
  updateMatch: (match: Match) => void;
  removeMatch: (id: string) => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  currentMatch: null,
  isLoading: false,
  error: null,
  setMatches: (matches) => set({ matches }),
  setCurrentMatch: (match) => set({ currentMatch: match }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addMatch: (match) => 
    set((state) => ({ matches: [...state.matches, match] })),
  updateMatch: (match) =>
    set((state) => ({
      matches: state.matches.map((m) => 
        m.id === match.id ? match : m
      ),
      currentMatch: state.currentMatch?.id === match.id 
        ? { ...state.currentMatch, ...match }
        : state.currentMatch
    })),
  removeMatch: (id) =>
    set((state) => ({
      matches: state.matches.filter((m) => m.id !== id),
      currentMatch: state.currentMatch?.id === id 
        ? null 
        : state.currentMatch
    })),
}));
