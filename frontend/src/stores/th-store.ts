import stages from '@/th-data (todo-post: backend)/stages';
import { ThLevel, ThStage } from '@/types/th-types';
import { create } from 'zustand';

export type ThStore = {
  activeStage: ThStage;
  activeLevel: ThLevel | null;

  setActiveStage: (newStageId: "s1" | "s2" | "s3") => (void);
  setActiveLevel: (newLevel: ThLevel) => (void);
};

const useThStore = create<ThStore>((set) => {
  return {
    activeStage: stages[0],
    activeLevel: null,

    setActiveStage: (newStageId: "s1" | "s2" | "s3") => {
      set(state => {
        const newStage = stages.find(stage => stage.id === newStageId);
        return { ...state, activeStage: newStage };
      });
    },
    setActiveLevel: (newLevel) => set({ activeLevel: newLevel }),
  };
});

export default useThStore;