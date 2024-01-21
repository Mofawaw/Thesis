import { ThLevel, ThNode, ThStage } from "./th-types";

export interface User { // TODO-Post: Backend Version
  id: string;
  name: string;
  animal: string; // TODO-Post: UserAnimal
  gradient: string; // TODO-Post: UserGradient
}

export interface UserStageProgress { // TODO-Post: Backend Version
  userId: string;
  stage: ThStage;
  currentLevelId: string;
  status: "locked" | "unlocked" | "completed";
}

export interface UserLevelProgress { // TODO-Post: Backend Version
  userId: string;
  level: ThLevel;
  status: "locked" | "unlocked" | "completed";
  currentNodes: ThNode[];
  currentTippNodes: ThNode[];
}