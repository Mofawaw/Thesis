import { create } from 'zustand';

type CodeIDEStore = {
  code: string;
  setCode: (newCode: string) => (void);
};

const useCodeIDEStore = create<CodeIDEStore>((set) => ({
  code: '',
  setCode: (newCode: string) => set(() => ({ code: newCode }))
}));

export default useCodeIDEStore;