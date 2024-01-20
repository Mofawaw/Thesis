import stages from "./stages";
import levelS1C1 from './level-s1-c1';
import levelS1C2 from './level-s1-c2';
import levelS1C3 from './level-s1-c3';
import levelS2C1 from './level-s2-c1';
import levelS2C2 from './level-s2-c2';
import levelS2C3 from './level-s2-c3';
import levelS3C1 from './level-s3-c1';
import levelS3C2 from './level-s3-c2';
import levelS3C3 from './level-s3-c3';

stages[0].levels = [levelS1C1, levelS1C2, levelS1C3];
stages[1].levels = [levelS2C1, levelS2C2, levelS2C3];
stages[2].levels = [levelS3C1, levelS3C2, levelS3C3];