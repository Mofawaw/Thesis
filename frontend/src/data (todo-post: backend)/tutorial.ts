import { ThLevel, ThNode } from "@/types/th-types.ts";
import stages from "./stages";
import categories from "./categories";

export const tutorialNode: ThNode = {
  baseNode: {
    id: "c-tu",
    type: "tutorial",
    data: {
      title: "Tutorial",
      size: "medium",
    }
  },
  data: {}
}