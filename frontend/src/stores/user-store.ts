import BackendDummy from '@/data (todo-post: backend)/backend-dummy';
import { ThLevel, ThNode, ThStage } from '@/types/th-types';
import { UserLevelProgress, UserStageProgress } from '@/types/user-types';
import { create } from 'zustand';

const backendDummy = new BackendDummy(); // TODO-Post: Backend

export type UserStore = {
  stagesProgress: Record<string, UserStageProgress>;
  levelsProgress: Record<string, UserLevelProgress>;

  // Update currentLevel of stage
  updateStageProgressCurrentLevel: (stageId: string, newCurrentLevel: Record<number, string>) => void;

  // Update status of stage
  updateStageProgressStatus: (stageId: string, newStatus: "locked" | "unlocked" | "completed") => void;

  // Update status of level
  updateLevelProgressStatus: (levelId: string, newStatus: "locked" | "unlocked" | "completed") => void;

  // Update currentNodes of level
  updateLevelProgressCurrentNodes: (levelId: string, newCurrentNodes: ThNode[]) => void;

  // Update currentTippNodes of level
  updateLevelProgressCurrentTippNodes: (levelId: string, newCurrentTippNodes: ThNode[]) => void;
};

const useUserStore = create<UserStore>((set) => {
  const stagesProgress = backendDummy.stages.reduce((acc, stage) => ({
    ...acc,
    [stage.id]: {
      userId: "u1", // TODO-Post: User
      stageId: stage.id,
      currentLevel: stage.levels[0],
      status: "locked",
    }
  }), {});

  const levelsProgress = backendDummy.levels.flat().reduce((acc, level) => ({
    ...acc,
    [level.id]: {
      userId: "u1", // TODO-Post: User
      levelId: level.id,
      status: "locked",
      currentNodes: [],
      currentTippNodes: []
    }
  }), {});

  return {
    stagesProgress,
    levelsProgress,

    updateStageProgressCurrentLevel: (stageId, newCurrentLevel) => {
      updateStage(stageId, stageProgress => ({ ...stageProgress, currentLevelId: newCurrentLevel }));
    },

    updateStageProgressStatus: (stageId, newStatus) => {
      updateStage(stageId, stageProgress => ({ ...stageProgress, status: newStatus }));
    },

    updateLevelProgressStatus: (levelId, newStatus) => {
      updateLevel(levelId, levelProgress => ({ ...levelProgress, status: newStatus }));
    },

    updateLevelProgressCurrentNodes: (levelId, newCurrentNodes) => {
      updateLevel(levelId, levelProgress => ({ ...levelProgress, currentNodes: newCurrentNodes }));
    },

    updateLevelProgressCurrentTippNodes: (levelId, newCurrentTippNodes) => {
      updateLevel(levelId, levelProgress => ({ ...levelProgress, currentTippNodes: newCurrentTippNodes }));
    }
  };

  function updateStage(stageId: string, transform: (stageProgress: UserStageProgress) => UserStageProgress) {
    set(state => {
      const currentStageProgress = state.stagesProgress[stageId];
      if (currentStageProgress) {
        const newStageProgress = transform(currentStageProgress);
        return {
          ...state,
          stagesProgress: {
            ...state.stagesProgress,
            [stageId]: newStageProgress
          }
        };
      }
      return state;
    });
  }

  function updateLevel(levelId: string, transform: (levelProgress: UserLevelProgress) => UserLevelProgress) {
    set(state => {
      const currentLevelProgress = state.levelsProgress[levelId];
      if (currentLevelProgress) {
        const newLevelProgress = transform(currentLevelProgress);
        return {
          ...state,
          levelsProgress: {
            ...state.levelsProgress,
            [levelId]: newLevelProgress
          }
        };
      }
      return state;
    });
  }
})

export default useUserStore;