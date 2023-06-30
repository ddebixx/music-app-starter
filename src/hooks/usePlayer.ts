import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeID?: string;
    setID: (id: string) => void;
    setIDs: (id: string[]) => void;
    reset: (id: string) => void;
};

export const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeID: undefined,
    setID: (id: string) => set({ activeID: id }),
    setIDs: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ activeID: undefined}),
})); 

