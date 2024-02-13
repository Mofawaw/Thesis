import { ThNode } from "@/types/th-types.ts";

const tutorialNodes: ThNode[] = [
  {
    baseNode: {
      id: "tu-s1",
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
    baseNode: {
      id: "tu-s2",
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

export default tutorialNodes;