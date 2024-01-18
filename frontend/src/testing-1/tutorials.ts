import { ThLevelNode } from "../app/level/types/th-types";

export const tutorialNodes: ThLevelNode[] = [
  {
    node: {
      id: "t1",
      type: "tutorial",
      data: {
        title: "Wertetypen",
        size: "medium",
        isDefault: false
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
        isDefault: false
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