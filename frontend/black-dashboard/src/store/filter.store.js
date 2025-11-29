import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filtersStore: {
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    country: "",
    city: "",
    pestle: "",
    source: "",
    likelihood: [0, 100],
    relevance: [0, 100],
    intensity: [0, 100],
  },

  setFilter: (key, value) =>
    set((state) => ({
      filtersStore: {
        ...state.filtersStore,
        [key]: value,
      },
    })),

  resetFilters: () =>
    set({
      filtersStore: {
        end_year: "",
        topic: "",
        sector: "",
        region: "",
        country: "",
        city: "",
        pestle: "",
        source: "",
        likelihood: [0, 100],
        relevance: [0, 100],
        intensity: [0, 100],
      },
    }),
}));
