import { ThLevel } from "@/types/th-types.ts";
import stages from "@/data (todo-post: backend)/stages.ts";
import useThStore from "@/stores/th-store.ts";
import useUserStore from "@/stores/user-store.ts";
import getRandomIntBetween from "@/helpers/random.ts";

import levelS1L1 from '@/data (todo-post: backend)/levels/stage-1/level-s1-l1.ts';
import levelS1L2 from '@/data (todo-post: backend)/levels/stage-1/level-s1-l2.ts';
import levelS1LFinal from '@/data (todo-post: backend)/levels/stage-1/level-s1-lfinal.ts';

import levelS2L1 from '@/data (todo-post: backend)/levels/stage-2/level-s2-l1.ts';
import levelS2L2 from '@/data (todo-post: backend)/levels/stage-2/level-s2-l2.ts';
import levelS2LFinal from '@/data (todo-post: backend)/levels/stage-2/level-s2-lfinal.ts';

import levelS3L1 from '@/data (todo-post: backend)/levels/stage-3/level-s3-l1.ts';
import levelS3L2 from '@/data (todo-post: backend)/levels/stage-3/level-s3-l2.ts';
import levelS3L3 from '@/data (todo-post: backend)/levels/stage-3/level-s3-l3.ts';
import levelS3LFinal from '@/data (todo-post: backend)/levels/stage-3/level-s3-lfinal.ts';

const levels: ThLevel[][] = [
  [levelS1L1, levelS1L2, levelS1LFinal],
  [levelS2L1, levelS2L2, levelS2LFinal],
  [levelS3L1, levelS3L2, levelS3L3, levelS3LFinal]
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
