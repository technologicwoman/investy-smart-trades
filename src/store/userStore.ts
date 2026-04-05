import { create } from "zustand";

interface UserState {
  firstName: string;
  email: string;
  setFirstName: (name: string) => void;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  email: "",
  setFirstName: (firstName) => set({ firstName }),
  setEmail: (email) => set({ email }),
}));
