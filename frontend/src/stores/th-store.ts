import { ThLevel, ThStage } from '@/types/th-types';
import { create } from 'zustand';

export type ThStore = {
  activeStage: ThStage | null;
  activeLevel: ThLevel | null;

  setActiveStage: (newStage: ThStage) => (void);
  setActiveLevel: (newLevel: ThLevel) => (void);
};

const useThStore = create<ThStore>((set) => {
  return {
    activeStage: null,
    activeLevel: null,

    setActiveStage: (newStage) => set({ activeStage: newStage }),
    setActiveLevel: (newLevel) => set({ activeLevel: newLevel }),
  };
});

export default useThStore;