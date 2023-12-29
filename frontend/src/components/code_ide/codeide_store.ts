import { create } from 'zustand';

type CodeIDEStore = {
  code: string;
  output: string;
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
};

const useCodeIDEStore = create<CodeIDEStore>((set) => ({
  code: '',
  output: '',
  setCode: (newCode: string) => set(() => ({ code: newCode })),
  setOutput: (newOutput: string) => set(() => ({ output: newOutput }))
}));

export default useCodeIDEStore;