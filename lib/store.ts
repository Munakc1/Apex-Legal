"use client";

import { create } from "@lacspace/store";

interface ServicesStore {
  selected: string[];
  toggle: (serviceTitle: string) => void;
  remove: (serviceTitle: string) => void;
  clear: () => void;
  init: () => void;
}

export const useServicesStore = create<ServicesStore>((set) => ({
  selected: [],
  toggle: (serviceTitle: string) =>
    set((state) => {
      const exists = state.selected.includes(serviceTitle);
      const next = exists
        ? state.selected.filter((s) => s !== serviceTitle)
        : [...state.selected, serviceTitle];
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("apex_legal_selected_services", JSON.stringify(next));
        }
      } catch (e) {
        console.error("Failed to save selected services to localStorage", e);
      }
      return { selected: next };
    }),
  remove: (serviceTitle: string) =>
    set((state) => {
      const next = state.selected.filter((s) => s !== serviceTitle);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("apex_legal_selected_services", JSON.stringify(next));
        }
      } catch (e) {
        console.error("Failed to update selected services in localStorage", e);
      }
      return { selected: next };
    }),
  clear: () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("apex_legal_selected_services");
      }
    } catch (e) {
      console.error("Failed to clear selected services from localStorage", e);
    }
    set({ selected: [] });
  },
  init: () => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("apex_legal_selected_services");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            set({ selected: parsed });
          }
        }
      }
    } catch (e) {
      console.error("Failed to read selected services from localStorage", e);
    }
  },
}));
