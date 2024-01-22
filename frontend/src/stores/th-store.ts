import BackendDummy from '@/data (todo-post: backend)/backend-dummy';
import { ThLevel, ThStage } from '@/types/th-types';
import { create } from 'zustand';

export type ThStore = {
  stages: ThStage[];
  activeStage: ThStage;
  activeLevel: ThLevel | null;

  setActiveStage: (newStageId: "s1" | "s2" | "s3") => (void);
  setActiveLevel: (newLevel: ThLevel) => (void);
};

const useThStore = create<ThStore>((set) => {
  const backendDummy = new BackendDummy(); // TODO-Post: Backend 

  return {
    stages: backendDummy.stages,
    activeStage: backendDummy.stages[0], // TODO: LocalStorage
    activeLevel: null,

    setActiveStage: (newStageId: "s1" | "s2" | "s3") => {
      set(state => {
        const newStage = state.stages.find(stage => stage.id === newStageId);
        return { ...state, activeStage: newStage };
      });
    },

    setActiveLevel: (newLevel) => set({ activeLevel: newLevel }),
  };
});

export default useThStore;