import { ThLevel } from "@/types/th-types.ts";
import stages from "@/data (todo-post: backend)/stages.ts";
import useThStore from "@/stores/th-store.ts";
import useUserStore from "@/stores/user-store.ts";
import getRandomIntBetween from "@/helpers/random.ts";

import levelL1 from '@/data (todo-post: backend)/levels/stage-1/level-s1-l1';
import levelL2 from '@/data (todo-post: backend)/levels/stage-1/level-s1-l2';
import levelL3 from '@/data (todo-post: backend)/levels/stage-1/level-s1-l3';
import levelL4 from '@/data (todo-post: backend)/levels/stage-1/level-s1-lfinal';
import levelL5 from '@/data (todo-post: backend)/levels/stage-2/level-s2-l1';
import levelL6 from '@/data (todo-post: backend)/levels/stage-2/level-s2-l2';
import levelL7 from "@/data (todo-post: backend)/levels/stage-2/level-s2-l3";
import levelL8 from "@/data (todo-post: backend)/levels/stage-2/level-s2-lfinal";
import levelL9 from "@/data (todo-post: backend)/levels/stage-3/level-s3-l1";
import levelL10 from "@/data (todo-post: backend)/levels/stage-3/level-s3-l2";
import levelL11 from "@/data (todo-post: backend)/levels/stage-3/level-s3-l3";
import levelL12 from "@/data (todo-post: backend)/levels/stage-3/level-s3-lfinal";

const levels: ThLevel[][] = [
  [levelL1, levelL2, levelL3, levelL4, levelL5, levelL6, levelL7, levelL8, levelL9, levelL10, levelL10, levelL11, levelL12],
];

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchAndConfigureStage = async () => {
  await delay(getRandomIntBetween(300, 1800));

  // Update stores
  useThStore.getState().initializeThStore(stages);
  useUserStore.getState().initializeStagesProgress(stages);
};

export const fetchAndConfigureLevel = async (levelId: string) => {
  await delay(getRandomIntBetween(300, 2000));

  const loadingLevel = levels.flat().find(level => level.id === levelId) ?? null;
  console.log(loadingLevel);

  if (loadingLevel) {
    const stageProgress = useUserStore.getState().stagesProgress[loadingLevel.stage.id]
    const newLevelStatus = stageProgress.levelsStatus.find(levelStatus => levelStatus.id === loadingLevel.id)

    // Reject if locked
    if (newLevelStatus?.status === "locked") {
      useThStore.getState().setActiveLevel(null);
      return Promise.reject({ title: "Hey!", message: "Nicht cheaten." });
    }

    // Update stores
    useUserStore.getState().initializeLevelProgress(loadingLevel.id, loadingLevel.nodes);

    // Update level based on progress
    const levelProgress = useUserStore.getState().levelsProgress[loadingLevel.id];
    if (levelProgress) {
      console.log("LevelProgress:", levelProgress);
      loadingLevel.nodes = levelProgress.currentNodes;
    } else {
      console.log("First initialization!");
    }
    useThStore.getState().setActiveLevel(loadingLevel);

    return Promise.resolve(true);
  }

  // Reject if levelId incorrect
  return Promise.reject(null);
};
