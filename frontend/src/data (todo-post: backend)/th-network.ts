import { ThLevel, ThNode, ThStage } from "@/types/th-types.ts";
import stages from "./stages.ts";
import tutorialNodes from "./tutorials.ts";
import useThStore from "@/stores/th-store.ts";
import useUserStore from "@/stores/user-store.ts";
import getRandomIntBetween from "@/helpers/random.ts";

import levelS1L1 from './levels/stage-1/level-s1-l1.ts';
import levelS1L2 from './levels/stage-1/level-s1-l2.ts';
import levelS1L3 from './levels/stage-1/level-s1-l3.ts';
import levelS1L4 from './levels/stage-1/level-s1-l4.ts';
import levelS1L5 from './levels/stage-1/level-s1-l5.ts';
import levelS1LFinal from './levels/stage-1/level-s1-lfinal.ts';

import levelS2L1 from './levels/stage-2/level-s2-l1.ts';
import levelS2L2 from './levels/stage-2/level-s2-l2.ts';
import levelS2L3 from './levels/stage-2/level-s2-l3.ts';
import levelS2L4 from './levels/stage-2/level-s2-l4.ts';
import levelS2L5 from './levels/stage-2/level-s2-l5.ts';
import levelS2LFinal from './levels/stage-2/level-s2-lfinal.ts';

import levelS3L1 from './levels/stage-3/level-s3-l1.ts';
import levelS3L2 from './levels/stage-3/level-s3-l2.ts';
import levelS3L3 from './levels/stage-3/level-s3-l3.ts';
import levelS3L4 from './levels/stage-3/level-s3-l4.ts';
import levelS3L5 from './levels/stage-3/level-s3-l5.ts';
import levelS3L6 from './levels/stage-3/level-s3-l6.ts';
import levelS3LFinal from './levels/stage-3/level-s3-lfinal.ts';

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchStagesAndInitializeThAndUserData = async () => {
  await delay(getRandomIntBetween(300, 1800));

  // Initialize stores
  useThStore.getState().initializeThStore(stages);
  useUserStore.getState().initializeStagesProgress(stages);

  // Set initial active stage based on progress
  // const stagesProgress = useUserStore.getState().stagesProgress;
  // const activeStage = Object.values(stagesProgress).find(stageProgress => stageProgress.status === "unlocked")?.stageId;
  // if (activeStage) {
  //   useThStore.getState().setActiveStage(activeStage);
  // }

  await delay(getRandomIntBetween(300, 600));
};

export const fetchLevelAndSetActiveLevel = async (levelId: string) => {
  await delay(getRandomIntBetween(300, 2000));
  const levels: ThLevel[][] = [
    [levelS1L1, levelS1L2, levelS1L3, levelS1L4, levelS1L5, levelS1LFinal],
    [levelS2L1, levelS2L2, levelS2L3, levelS2L4, levelS2L5, levelS2LFinal],
    [levelS3L1, levelS3L2, levelS3L3, levelS3L4, levelS3L5, levelS3L6, levelS3LFinal]
  ];

  const newLevel = levels.flat().find(level => level.id === levelId) ?? null;
  console.log(newLevel);
  useThStore.getState().setActiveLevel(newLevel);
};

export const fetchTutorialNodes = async (): Promise<ThNode[]> => {
  await delay(2000);
  return tutorialNodes;
};

