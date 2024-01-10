import { create } from 'zustand';
import { ThLevel } from '../components/level/types/thTypes';

import levelS1C1 from './levelS1C1';

export type TestingStore = {
  currentLevel: ThLevel;
  // setCurrentLevel: (stage: "s1" | "s2" | "s3", category: "c1" | "c2" | "c3") => void;
  nextLevel: (currentLevelId: string) => void;
};

const useTestingStore = create<TestingStore>((set) => ({
  currentLevel: levelS1C1,

  nextLevel: (currentLevelId) => () => {
    switch (currentLevelId) {
      // case "l-s1c1": set({ currentLevel: levelS1C2 }); break;
      // case "l-s1c2": set({ currentLevel: levelS1C3 }); break;
      // case "l-s1c3": set({ currentLevel: levelS2C1 }); break;
      // case "l-s2c1": set({ currentLevel: levelS2C2 }); break;
      // case "l-s2c2": set({ currentLevel: levelS2C3 }); break;
      // case "l-s2c3": set({ currentLevel: levelS3C1 }); break;
      // case "l-s3c1": set({ currentLevel: levelS3C2 }); break;
      // case "l-s3c2": set({ currentLevel: levelS3C3 }); break;
      // case "l-s3c3": set({ currentLevel: levelS1C1 }); break;
      default:
        set({ currentLevel: levelS1C1 });
    }
  },
}));

export default useTestingStore;
