import { ThNode } from "./th-types";

export interface User { // TODO-Post: Backend Version
  id: string;
  name: string;
  animal: string; // TODO-Post: UserAnimal
  gradient: string; // TODO-Post: UserGradient
}

export interface UserStageProgress { // TODO-Post: Backend Version
  userId: string;
  stageId: "s1" | "s2" | "s3";
  levelsStatus: { id: string, status: UserProgressStatus }[];
  status: UserProgressStatus;
}

export interface UserLevelProgress { // TODO-Post: Backend Version
  userId: string;
  levelId: string;
  status: UserProgressStatus;
  currentNodes: ThNode[];
  checkingAttempts: number;
}

export type UserProgressStatus = "locked" | "unlocked" | "completed"