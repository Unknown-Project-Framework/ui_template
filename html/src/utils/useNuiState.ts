import { create } from "zustand";

interface NuiState {
  slot_id: number | null;
  setSlotId: (slot_id: number | null) => void;

  characters: any[];
  setCharacters: (characters: any) => void;
}

export const nuiState = create<NuiState>((set) => ({
  slot_id: null,
  setSlotId: (slot_id: number | null) => set({ slot_id }),
  characters: [],
  setCharacters: (characters: any) => set({ characters }),
}));
