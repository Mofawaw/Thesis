import { create } from 'zustand';
import { ThLevel } from '../components/level/types/thTypes';

import levelS1C1 from './levelS1C1';
import levelS1C2 from './levelS1C2';
import levelS1C3 from './levelS1C3';
import levelS2C1 from './levelS2C1';
import levelS2C2 from './levelS2C2';
import levelS2C3 from './levelS2C3';
import levelS3C1 from './levelS3C1';
import levelS3C2 from './levelS3C2';
import levelS3C3 from './levelS3C3';

export const levels = [
  levelS1C1,
  levelS1C2,
  levelS1C3,
  levelS2C1,
  levelS2C2,
  levelS2C3,
  levelS3C1,
  levelS3C2,
  levelS3C3
]

let navigate: any;

export const initializeNavigation = (nav: any) => {
  navigate = nav;
};

export type TestingStore = {
  currentLevel: ThLevel;
  nextLevel: (sameStage?: boolean, sameCategory?: boolean) => void;
};

const useTestingStore = create<TestingStore>((set) => ({
  currentLevel: levelS1C1,

  nextLevel: (sameStage, sameCategory) => {
    set((state) => {
      let nextLevel;
      if (sameStage) {
        switch (state.currentLevel.id) {
          case "l-s1c1": nextLevel = levelS1C2; break;
          case "l-s1c2": nextLevel = levelS1C3; break;
          case "l-s1c3": nextLevel = levelS1C1; break;
          case "l-s2c1": nextLevel = levelS2C2; break;
          case "l-s2c2": nextLevel = levelS2C3; break;
          case "l-s2c3": nextLevel = levelS2C1; break;
          case "l-s3c1": nextLevel = levelS3C2; break;
          case "l-s3c2": nextLevel = levelS3C3; break;
          case "l-s3c3": nextLevel = levelS3C1; break;
          default: nextLevel = levelS1C1;
        }
      } else if (sameCategory) {
        switch (state.currentLevel.id) {
          case "l-s1c1": nextLevel = levelS2C1; break;
          case "l-s1c2": nextLevel = levelS2C2; break;
          case "l-s1c3": nextLevel = levelS2C3; break;
          case "l-s2c1": nextLevel = levelS3C1; break;
          case "l-s2c2": nextLevel = levelS3C2; break;
          case "l-s2c3": nextLevel = levelS3C3; break;
          case "l-s3c1": nextLevel = levelS1C1; break;
          case "l-s3c2": nextLevel = levelS1C2; break;
          case "l-s3c3": nextLevel = levelS1C3; break;
          default: nextLevel = levelS1C1;
        }
      } else {
        switch (state.currentLevel.id) {
          case "l-s1c1": nextLevel = levelS1C2; break;
          case "l-s1c2": nextLevel = levelS1C3; break;
          case "l-s1c3": nextLevel = levelS2C1; break;
          case "l-s2c1": nextLevel = levelS2C2; break;
          case "l-s2c2": nextLevel = levelS2C3; break;
          case "l-s2c3": nextLevel = levelS3C1; break;
          case "l-s3c1": nextLevel = levelS3C2; break;
          case "l-s3c2": nextLevel = levelS3C3; break;
          case "l-s3c3": nextLevel = levelS1C1; break;
          default: nextLevel = levelS1C1;
        }
      }

      if (nextLevel) {
        navigate(`/level/${nextLevel.id}`);
      }

      return { currentLevel: nextLevel };
    });
  },
}));

export default useTestingStore;

