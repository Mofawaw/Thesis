import { create } from 'zustand';
import { ThLevel } from '../components/level/types/thTypes';

import levelS1C1 from './levelS1C1';
import levelS1C2 from './levelS1C2';
import levelS1C3 from './levelS1C3';

export const levels = [
  levelS1C1,
  levelS1C2,
  levelS1C3
]

let navigate: any;

export const initializeNavigation = (nav: any) => {
  navigate = nav;
};

export type TestingStore = {
  currentLevel: ThLevel;
  nextLevel: () => void;
};

const useTestingStore = create<TestingStore>((set) => ({
  currentLevel: levelS1C1,

  nextLevel: () => {
    set((state) => {
      let nextLevel;
      switch (state.currentLevel.id) {
        case "l-s1c1": nextLevel = levelS1C2; break;
        case "l-s1c2": nextLevel = levelS1C3; break;
        // case "l-s1c3": return { currentLevel: levelS2C1 };
        // case "l-s2c1": return { currentLevel: levelS2C2 };
        // case "l-s2c2": return { currentLevel: levelS2C3 };
        // case "l-s2c3": return { currentLevel: levelS3C1 };
        // case "l-s3c1": return { currentLevel: levelS3C2 };
        // case "l-s3c2": return { currentLevel: levelS3C3 };
        // case "l-s3c3": return { currentLevel: levelS1C1 };
        default: nextLevel = levelS1C1;
      }

      if (nextLevel) {
        navigate(`/level/${nextLevel.id}`);
      }

      return { currentLevel: nextLevel };
    });
  },
}));

export default useTestingStore;

