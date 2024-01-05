import { create } from 'zustand';
import ThLevel from './types/ThLevel';
import LevelNode from './types/LevelNode';

export type LevelStore = {
  level: ThLevel | null;
  nodes: LevelNode[];

  setLevel: (newLevel: ThLevel) => void;
  setNodes: (newNode: LevelNode[]) => void;
};

const createLevelStore = create<LevelStore>((set) => ({
  level: null,
  nodes: [],

  setLevel: (newLevel) => set({ level: newLevel }),
  setNodes: (newNodes) => set({ nodes: newNodes }),
}));

export default createLevelStore;