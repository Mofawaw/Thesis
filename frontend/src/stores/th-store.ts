import { ThLevel, ThStage } from '@/types/th-types';
import { create } from 'zustand';

export type ThStore = {
  stages: ThStage[];
  activeStage: ThStage | null;
  activeLevel: ThLevel | null;

  initializeThStore: (initialStages: ThStage[]) => (void);
  setActiveStage: (newStageId: "s1" | "s2" | "s3") => (void);
  setActiveLevel: (newLevel: ThLevel | null) => (void);
};

const useThStore = create<ThStore>((set) => {
  return {
    stages: [],
    activeStage: null,
    activeLevel: null,

    initializeThStore: (initialStages: ThStage[]) => {
      set(state => {
        if (state.stages.length > 0) {
          return state
        }
        return { ...state, stages: initialStages, activeStage: initialStages[0] };
      });
    },

    setActiveStage: (newStageId: "s1" | "s2" | "s3") => {
      set(state => {
        const newStage = state.stages.find(stage => stage.id === newStageId);
        return { ...state, activeStage: newStage };
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