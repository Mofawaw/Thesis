import { ThLevelNode } from "@/types/th-types.ts";

export const tutorialNodes: ThLevelNode[] = [
  {
    node: {
      id: "t1",
      type: "tutorial",
      data: {
        title: "Wertetypen",
        size: "medium",
      }
    },
    data: {
      tutorial: {
        color: "th-value",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    }
  },
  {
    node: {
      id: "t2",
      type: "tutorial",
      data: {
        title: "Referenztypen",
        size: "medium",
      }
    },
    data: {
      tutorial: {
        color: "th-reference",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    }
  }
]