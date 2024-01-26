import { ThNode, ThStage } from '@/types/th-types';
import { UserLevelProgress, UserStageProgress } from '@/types/user-types';
import { create } from 'zustand';

export type UserStore = {
  stagesProgress: Record<string, UserStageProgress>;
  levelsProgress: Record<string, UserLevelProgress>;

  // Initialize stagesProgress
  initializeStagesProgress: (stages: ThStage[]) => (void);

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
  // Initialize stagesProgress
  const stagesProgress = {}; // TODO: LocalStorage

  // Initialize levelsProgress
  const levelsProgress = {}; // TODO: LocalStorage

  return {
    stagesProgress,
    levelsProgress,

    initializeStagesProgress: (stages: ThStage[]) => {
      set(state => {
        const newStagesProgress = stages.reduce((acc, stage) => ({
          ...acc,
          [stage.id]: {
            userId: "u1", // TODO-Post: User
            stageId: stage.id,
            currentLevel: stage.levels[0],
            status: "locked",
          }
        }), {});

        return {
          ...state,
          stagesProgress: newStagesProgress
        };
      });
    },

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