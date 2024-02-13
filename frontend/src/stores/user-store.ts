import useCodeIDEStore from '@/app/code-ide/code-ide-store';
import { ThLevel, ThNode, ThStage } from '@/types/th-types';
import { UserLevelProgress, UserProgress, UserProgressStatus, UserStageProgress } from '@/types/user-types';
import { create } from 'zustand';

export type UserStore = {
  userProgress: UserProgress | null;
  stagesProgress: Record<string, UserStageProgress>;
  levelsProgress: Record<string, UserLevelProgress>;

  // Configure userProgress
  initializeUserProgress: () => (void);

  // Update userProgress
  updateUserProgress: (updates: any) => (void);

  // Configure stagesProgress
  initializeStagesProgress: (stages: ThStage[]) => (void);

  // Configure levelProgress
  initializeLevelProgress: (levelId: string, nodes: ThNode[]) => (void);

  // Update stage and level progress after level completion
  completeLevel: (stageId: string, levelId: string) => (void);

  // Update currentNodes of level
  updateLevelProgressCurrentNodes: (level: ThLevel) => void;

  // Increase failed checks by one
  increaseLevelCheckingAttempt: (levelId: string) => void;
};

// LocalStorage
const localStorageKey = 'userProgress';

function loadFromLocalStorage(): Partial<UserStore> {
  const storedState = localStorage.getItem(localStorageKey);
  return storedState ? JSON.parse(storedState) : {};
}

function saveToLocalStorage(userProgress: UserProgress | null, stagesProgress: Record<string, UserStageProgress>, levelsProgress: Record<string, UserLevelProgress>): void {
  const stateToSave = { userProgress, stagesProgress, levelsProgress };
  localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
}

const useUserStore = create<UserStore>((set, get) => {
  const initialState = loadFromLocalStorage();

  return {
    userProgress: initialState.userProgress || null,
    stagesProgress: initialState.stagesProgress || {},
    levelsProgress: initialState.levelsProgress || {},

    initializeUserProgress: () => {
      set(state => {
        if (state.userProgress) { return state }

        const newUserProgress = {
          userId: "u1", // TODO-Post: User
          firstVisit: false,
          completedStage1: false,
          completedStage2: false,
          completedAllStages: false
        }

        return {
          ...state,
          userProgress: newUserProgress
        }
      })
    },

    updateUserProgress: (updates: any) => {
      set(state => {
        const updatedUserProgress = {
          ...state.userProgress,
          ...updates
        };

        return {
          ...state,
          userProgress: updatedUserProgress
        };
      });
    },

    initializeStagesProgress: (initialStages: ThStage[]) => {
      set(state => {
        // Return if already initialized
        if (Object.keys(state.stagesProgress).length > 0) { return state }

        // Initialization
        const newStagesProgress: Record<string, UserStageProgress> = initialStages.reduce((acc, stage) => ({
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

        return { ...state, stagesProgress: newStagesProgress };
      });
    },

    initializeLevelProgress: (levelId: string, nodes: ThNode[]) => {
      set(state => {
        // Return if already initialized
        if (levelId in state.levelsProgress) { return state }

        // Initialization
        const newLevelProgress = {
          userId: "u1", // TODO-Post: User
          levelId: levelId,
          status: "unlocked" as "unlocked",
          currentNodes: nodes,
          checkingAttempts: 0,
        };

        console.log("Initializing:", newLevelProgress)

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
        const updatedLevelProgress = { ...state.levelsProgress[levelId], status: 'completed' as UserProgressStatus };

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

    updateLevelProgressCurrentNodes: (level: ThLevel) => {
      set(state => {
        const updatedNodes: ThNode[] = level.nodes.map(node => {
          if (node.baseNode.type === "codeIDE" && node.baseNode.data.codeIDE) {
            const codeIDEStore = useCodeIDEStore(node.baseNode.data.codeIDE.scopeId).getState();

            return {
              ...node,
              data: {
                ...node.data,
                codeIDE: {
                  ...node.data.codeIDE,
                  initialCode: codeIDEStore.code,
                  initialGraph: codeIDEStore.graph,
                },
              },
            };
          }

          return node;
        });

        return {
          ...state,
          levelsProgress: {
            ...state.levelsProgress,
            [level.id]: {
              ...state.levelsProgress[level.id],
              currentNodes: updatedNodes
            }
          }
        }
      });
    },

    increaseLevelCheckingAttempt: (levelId: string) => {
      set(state => {
        return {
          ...state,
          levelsProgress: {
            ...state.levelsProgress,
            [levelId]: {
              ...state.levelsProgress[levelId],
              checkingAttempts: state.levelsProgress[levelId].checkingAttempts + 1
            }
          }
        }
      });
    },
  };
});

useUserStore.subscribe((state, previousState) => {
  if (state.userProgress !== previousState.userProgress || state.stagesProgress !== previousState.stagesProgress || state.levelsProgress !== previousState.levelsProgress) {
    saveToLocalStorage(state.userProgress, state.stagesProgress, state.levelsProgress);
  }
});

export default useUserStore;