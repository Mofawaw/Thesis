import { ThLevel, ThNode } from "@/types/th-types.ts";
import stages from "./stages";
import categories from "./categories";

export const tutorialNodes: ThNode[] = [
  {
    baseNode: {
      id: "tu-main",
      type: "tutorial",
      data: {
        title: "Tutorial",
        size: "small",
      }
    },
    data: {
      tutorial: {
        id: "main"
      }
    }
  },
  {
    baseNode: {
      id: "tu-val",
      type: "tutorial",
      data: {
        title: "Wertetypen",
        size: "medium",
      }
    },
    data: {
      tutorial: {
        id: "value"
      }
    }
  },
  {
    baseNode: {
      id: "tu-ref",
      type: "tutorial",
      data: {
        title: "Referenztypen",
        size: "medium",
      }
    },
    data: {
      tutorial: {
        id: "reference"
      }
    }
  }
]