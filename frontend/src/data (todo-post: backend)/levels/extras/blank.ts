import categories from "@/data (todo-post: backend)/categories";
import { ThNode } from "@/types/th-types";

export const emptyIDENode: ThNode = { baseNode: categories[0].baseNodes[0], data: { codeIDE: { initialCode: "" } } }
