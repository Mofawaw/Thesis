import { ThNode, ThStage } from '@/types/th-types';
import { UserLevelProgress, UserProgressStatus, UserStageProgress } from '@/types/user-types';
import { create } from 'zustand';
import useThStore from './th-store';

export type UserStore = {
  stagesProgress: Record<string, UserStageProgress>;
  levelsProgress: Record<string, UserLevelProgress>;

  // Initialize stagesProgress
  initializeStagesProgress: (stages: ThStage[]) => (void);

  // Initialize levelProgress
  initializeLevelProgress: (levelId: string) => (void);

  // Update stage and level progress after level completion
  completeLevel: (stageId: string, levelId: string) => (void);

  // Update currentNodes of level
  updateLevelProgressCurrentNodes: (levelId: string, newCurrentNodes: ThNode[]) => void;

  // Update currentTippNodes of level
  updateLevelProgressCurrentTippNodes: (levelId: string, newCurrentTippNodes: ThNode[]) => void;
};

// LocalStorage
const localStorageKey = 'userProgress';

function loadFromLocalStorage(): Partial<UserStore> {
  const storedState = localStorage.getItem(localStorageKey);
  return storedState ? JSON.parse(storedState) : {};
}

function saveToLocalStorage(stagesProgress: Record<string, UserStageProgress>, levelsProgress: Record<string, UserLevelProgress>): void {
  const stateToSave = { stagesProgress, levelsProgress };
  localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
}

const useUserStore = create<UserStore>((set, get) => {
  const initialState = loadFromLocalStorage();

  return {
    stagesProgress: initialState.stagesProgress || {},
    levelsProgress: initialState.levelsProgress || {},

    initializeStagesProgress: (stages: ThStage[]) => {
      set(state => {
        const newStagesProgress: Record<string, UserStageProgress> = stages.reduce((acc, stage) => ({
          ...acc,
          [stage.id]: {
            userId: "u1", // TODO-Post: User
            stageId: stage.id,
            levelsStatus: stage.stageLevels.map(stageLevel => ({ id: stageLevel.levelId, order: stageLevel.order, status: "locked" as "locked" })),
            status: "locked",
          }
        }), {});

        newStagesProgress["s1"].status = "unlocked";
        newStagesProgress["s1"].levelsStatus[0].status = "unlocked";

        return {
          ...state,
          stagesProgress: newStagesProgress
        };
      });
    },

    initializeLevelProgress: (levelId: string) => {
      set(state => {
        if (state.levelsProgress[levelId]) {
          return state;
        }

        const newLevelProgress = {
          userId: "u1", // TODO-Post: User
          levelId: levelId,
          currentNodes: [],
          currentTippNodes: [],
          status: "locked" as "locked",
        };

        console.log("---Initializing:", newLevelProgress)

        return {
          ...state,
          levelsProgress: {
            ...state.levelsProgress,
            [levelId]: newLevelProgress
          }
        };
      });
    },

    completeLevel: (stageId, levelId) => {
      set(state => {
        // Complete the current level
        const updatedLevelProgress = {
          ...state.levelsProgress[levelId],
          status: 'completed' as UserProgressStatus
        };

        // Update the current stage: complete level and unlock next level
        const stageProgress = state.stagesProgress[stageId];
        const updatedLevelsStatus = stageProgress.levelsStatus.map(level =>
          level.id === levelId ? { ...level, status: 'completed' as UserProgressStatus } : level
        );
        const currentLevelIndex = updatedLevelsStatus.findIndex(level => level.id === levelId);
        if (currentLevelIndex !== -1 && currentLevelIndex + 1 < updatedLevelsStatus.length) {
          updatedLevelsStatus[currentLevelIndex + 1].status = 'unlocked' as UserProgressStatus;
        }
        const allLevelsCompleted = updatedLevelsStatus.every(level => level.status === 'completed');
        const newStageStatus = allLevelsCompleted ? 'completed' : stageProgress.status;
        const updatedStageProgress = { ...stageProgress, levelsStatus: updatedLevelsStatus, status: newStageStatus };

        // Prepare the updated state
        let newState = {
          ...state,
          levelsProgress: {
            ...state.levelsProgress,
            [levelId]: updatedLevelProgress
          },
          stagesProgress: {
            ...state.stagesProgress,
            [stageId]: updatedStageProgress
          }
        };

        // Unlock the next stage and its first level if the current stage is completed
        if (allLevelsCompleted) {
          const stageIds = Object.keys(newState.stagesProgress);
          const currentStageIndex = stageIds.indexOf(stageId);
          const nextStageId = stageIds[currentStageIndex + 1];
          if (nextStageId && newState.stagesProgress[nextStageId]) {
            const nextStageProgress = newState.stagesProgress[nextStageId];
            if (nextStageProgress.levelsStatus.length > 0) {
              nextStageProgress.levelsStatus[0].status = 'unlocked' as UserProgressStatus;
            }
            newState = {
              ...newState,
              stagesProgress: {
                ...newState.stagesProgress,
                [nextStageId]: {
                  ...nextStageProgress,
                  status: 'unlocked' as UserProgressStatus
                }
              }
            };
          }
        }

        return newState;
      });
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
      console.log("Current stage progress:", currentStageProgress)
      if (currentStageProgress) {
        const newStageProgress = transform(currentStageProgress);
        console.log("New stage progress:", newStageProgress);
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
    console.log("Updating level:", levelId);
    console.log("With transform:", transform);
    set(state => {
      const currentLevelProgress = state.levelsProgress[levelId];
      console.log("Current level progress:", currentLevelProgress)
      if (currentLevelProgress) {
        const newLevelProgress = transform(currentLevelProgress);
        console.log("New level progress:", newLevelProgress);
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
});

useUserStore.subscribe((state, previousState) => {
  if (state.stagesProgress !== previousState.stagesProgress || state.levelsProgress !== previousState.levelsProgress) {
    saveToLocalStorage(state.stagesProgress, state.levelsProgress);
  }
});

export default useUserStore;