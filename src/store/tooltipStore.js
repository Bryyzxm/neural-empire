import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SEEN_KEY = "@neural_empire/seen_tooltips_v1";

export const useTooltipStore = create((set, get) => ({
  seenTooltips: {}, // { [termId]: true }
  loaded: false,

  load: async () => {
    try {
      const raw = await AsyncStorage.getItem(SEEN_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      set({ seenTooltips: parsed, loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  hasSeen: (termId) => {
    return !!get().seenTooltips[termId];
  },

  markSeen: async (termId) => {
    const next = { ...get().seenTooltips, [termId]: true };
    set({ seenTooltips: next });
    try {
      await AsyncStorage.setItem(SEEN_KEY, JSON.stringify(next));
    } catch {}
  },
}));
