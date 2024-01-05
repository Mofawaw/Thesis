import { create } from 'zustand';
import Level from './types/Level';
import LevelNodeData from './types/LevelNodeData';

export type LevelStore = {
  level: Level | null;
  nodes: LevelNodeData[];

  setLevel: (newLevel: Level) => void;
  setNodes: (newNode: LevelNodeData[]) => void;
};

const createLevelStore = create<LevelStore>((set) => ({
  level: null,
  nodes: [],

  setLevel: (newLevel) => set({ level: newLevel }),
  setNodes: (newNodes) => set({ nodes: newNodes }),
}));

export default createLevelStore;