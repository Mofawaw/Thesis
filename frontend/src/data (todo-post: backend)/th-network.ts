import { ThLevel, ThNode, ThStage } from "@/types/th-types.ts";
import stages from "./stages.ts";
import tutorialNodes from "./tutorials.ts";

import levelS1C1 from './levels/level-s1-l1.ts';
import levelS1C2 from './levels/level-s1-l2.ts';
import levelS1C3 from './levels/level-s1-l3.ts';
import levelS2C1 from './levels/level-s2-l1.ts';
import levelS2C2 from './levels/level-s2-l2.ts';
import levelS2C3 from './levels/level-s2-l3.ts';
import levelS3C1 from './levels/level-s3-l1.ts';
import levelS3C2 from './levels/level-s3-l2.ts';
import levelS3C3 from './levels/level-s3-l3.ts';
import useThStore from "@/stores/th-store.ts";
import useUserStore from "@/stores/user-store.ts";
import getRandomIntBetween from "@/helpers/random.ts";

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchStagesAndInitializeThAndUserData = async () => {
  await delay(getRandomIntBetween(300, 1800));

  if (useThStore.getState().stages.length > 0) return;
  useThStore.getState().initializeStages(stages);

  if (Object.keys(useUserStore.getState().stagesProgress).length > 0) return;
  useUserStore.getState().initializeStagesProgress(stages);

  await delay(getRandomIntBetween(300, 600));
};

export const fetchLevelAndSetActiveLevel = async (levelId: string) => {
  await delay(getRandomIntBetween(300, 2000));
  const levels: ThLevel[][] = [
    [levelS1C1, levelS1C2, levelS1C3],
    [levelS2C1, levelS2C2, levelS2C3],
    [levelS3C1, levelS3C2, levelS3C3]
  ];

  const newLevel = levels.flat().find(level => level.id === levelId) ?? null;
  console.log(newLevel);
  useThStore.getState().setActiveLevel(newLevel);
};

export const fetchTutorialNodes = async (): Promise<ThNode[]> => {
  await delay(2000);
  return tutorialNodes;
};

