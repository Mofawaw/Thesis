import { ThNode, ThStage } from '@/types/th-types';
import { UserLevelProgress, UserStageProgress } from '@/types/user-types';
import { create } from 'zustand';

export type UserStore = {
  stagesProgress: Record<string, UserStageProgress>;
  levelsProgress: Record<string, UserLevelProgress>;

  // Initialize stagesProgress
  initializeStagesProgress: (stages: ThStage[]) => (void);

  // Initialize levelProgress
  initializeLevelProgress: (levelId: string) => (void);

  // Update currentLevel of stage
  updateStageProgressLevelsStatus: (stageId: string, newLevelStatus: { id: string, status: "locked" | "unlocked" | "completed" }) => void;

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
        const newStagesProgress: Record<string, UserStageProgress> = stages.reduce((acc, stage) => ({
          ...acc,
          [stage.id]: {
            userId: "u1", // TODO-Post: User
            stageId: stage.id,
            levelsStatus: stage.levels.map(level => ({ id: level.id, order: level.order, status: "locked" as "locked" })),
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

    updateStageProgressLevelsStatus: (stageId: string, newLevelStatus: { id: string, status: "locked" | "unlocked" | "completed" }) => {
      set(state => {
        const stageProgress = state.stagesProgress[stageId];
        if (!stageProgress) {
          console.error(`Stage with ID ${stageId} not found.`);
          return state;
        }

        const updatedLevelsStatus = stageProgress.levelsStatus.map(level =>
          level.id === newLevelStatus.id ? { ...level, status: newLevelStatus.status } : level
        );

        if (newLevelStatus.status === "completed") {
          const currentLevelIndex = updatedLevelsStatus.findIndex(level => level.id === newLevelStatus.id);
          if (currentLevelIndex !== -1 && currentLevelIndex + 1 < updatedLevelsStatus.length) {
            updatedLevelsStatus[currentLevelIndex + 1].status = "unlocked";
          }
        }

        return {
          ...state,
          stagesProgress: {
            ...state.stagesProgress,
            [stageId]: { ...stageProgress, levelsStatus: updatedLevelsStatus }
          }
        };
      });
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
})

export default useUserStore;