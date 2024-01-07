import { ThColorKeys } from "../../../../tailwind.config";
import ThLevel from "./ThLevel";

export default interface ThStage {
  id: string;
  label: string;
  color: ThColorKeys;
  levels: ThLevel[];
  // tutorials: ThTutorial[]; TODO
}
