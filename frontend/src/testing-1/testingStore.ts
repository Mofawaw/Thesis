import { create } from 'zustand';
import { ThLevel } from '../components/level/types/thTypes';

import levelS1C1 from './levelS1C1';
import levelS1C2 from './levelS1C2';

export type TestingStore = {
  currentLevel: ThLevel;
  nextLevel: () => void;
};

const useTestingStore = create<TestingStore>((set) => ({
  currentLevel: levelS1C1,

  nextLevel: () => {
    set((state) => {
      switch (state.currentLevel.id) {
        case "l-s1c1": return { currentLevel: levelS1C2 };
        // These cases are commented out as the levels are yet to be created and imported.
        // case "l-s1c2": return { currentLevel: levelS1C3 };
        // case "l-s1c3": return { currentLevel: levelS2C1 };
        // case "l-s2c1": return { currentLevel: levelS2C2 };
        // case "l-s2c2": return { currentLevel: levelS2C3 };
        // case "l-s2c3": return { currentLevel: levelS3C1 };
        // case "l-s3c1": return { currentLevel: levelS3C2 };
        // case "l-s3c2": return { currentLevel: levelS3C3 };
        // case "l-s3c3": return { currentLevel: levelS1C1 };
        default:
          return { currentLevel: levelS1C1 };
      }
    });
  },
}));

export default useTestingStore;

