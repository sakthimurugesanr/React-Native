import { create } from 'zustand';

type Profile = { name: string; email: string };
type LearningState = {
  count: number;
  profile: Profile | null;
  increment: () => void;
  saveProfile: (profile: Profile) => void;
  reset: () => void;
};

// Only nonsecret demo data is shared. Nothing is persisted or sent to a server.
export const useLearningStore = create<LearningState>()(set => ({
  count: 0,
  profile: null,
  increment: () => set(state => ({ count: state.count + 1 })),
  saveProfile: profile => set({ profile }),
  reset: () => set({ count: 0, profile: null }),
}));
