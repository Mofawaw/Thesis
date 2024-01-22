import { ThCategory, ThLevel, ThNode, ThStage } from "@/types/th-types.ts";
import stages from "./stages.ts";
import categories from "./categories.ts";
import tutorialNodes from "./tutorials.ts";

import levelS1C1 from './levels/level-s1-c1.ts';
import levelS1C2 from './levels/level-s1-c2.ts';
import levelS1C3 from './levels/level-s1-c3.ts';
import levelS2C1 from './levels/level-s2-c1.ts';
import levelS2C2 from './levels/level-s2-c2.ts';
import levelS2C3 from './levels/level-s2-c3.ts';
import levelS3C1 from './levels/level-s3-c1.ts';
import levelS3C2 from './levels/level-s3-c2.ts';
import levelS3C3 from './levels/level-s3-c3.ts';

class BackendDummy {
  stages: ThStage[];
  categories: ThCategory[];
  levels: ThLevel[][];
  tutorialNodes: ThNode[];

  constructor() {
    this.stages = stages;
    this.categories = categories;
    this.levels = [];
    this.tutorialNodes = tutorialNodes;

    this.initializeLevels();
  }

  initializeLevels() {
    this.levels = [
      [levelS1C1, levelS1C2, levelS1C3],
      [levelS2C1, levelS2C2, levelS2C3],
      [levelS3C1, levelS3C2, levelS3C3]
    ];
  }
}

export default BackendDummy;