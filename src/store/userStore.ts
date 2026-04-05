import { create } from "zustand";

interface UserState {
  firstName: string;
  email: string;
  experience: string;
  risk: string;
  goal: string;
  setFirstName: (name: string) => void;
  setEmail: (email: string) => void;
  setExperience: (experience: string) => void;
  setRisk: (risk: string) => void;
  setGoal: (goal: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  email: "",
  experience: "",
  risk: "",
  goal: "",
  setFirstName: (firstName) => set({ firstName }),
  setEmail: (email) => set({ email }),
  setExperience: (experience) => set({ experience }),
  setRisk: (risk) => set({ risk }),
  setGoal: (goal) => set({ goal }),
}));
