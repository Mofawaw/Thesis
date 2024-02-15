import { ThLevel, ThStage } from '@/types/th-types';
import { create } from 'zustand';

export type ThStore = {
  stages: ThStage[];
  activeLevel: ThLevel | null;

  initializeThStore: (initialStages: ThStage[]) => (void);
  setActiveLevel: (newLevel: ThLevel | null) => (void);
};

const useThStore = create<ThStore>((set) => {
  return {
    stages: [],
    activeLevel: null,

    initializeThStore: (initialStages: ThStage[]) => {
      set(state => {
        if (state.stages.length > 0) {
          return state
        }
        return { ...state, stages: initialStages };
      });
    },

    setActiveLevel: (newLevel: ThLevel | null) => {
      set(state => {
        return { ...state, activeLevel: newLevel };
      });
    },
  };
});

export default useThStore;