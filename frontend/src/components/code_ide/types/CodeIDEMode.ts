enum ProgramMode {
  write = "program-write",
  read = "program-read"
}

enum GraphMode {
  auto = "graph-auto",
  input = "graph-input",
  read = "graph-read"
}

class CodeIDEMode {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  static programWriteGraphAuto = new CodeIDEMode(ProgramMode.write + "-" + GraphMode.auto);
  static programWrite = new CodeIDEMode(ProgramMode.write);
  static programRead = new CodeIDEMode(ProgramMode.read);
  static graphAuto = new CodeIDEMode(GraphMode.auto);
  static graphInput = new CodeIDEMode(GraphMode.input);
  static graphRead = new CodeIDEMode(GraphMode.read);
  static default = new CodeIDEMode("default");

  has(mode: CodeIDEMode): boolean {
    return this.value.includes(mode.value);
  }

  static equal(mode1: CodeIDEMode, mode2: CodeIDEMode): boolean {
    return mode1.has(mode2) || mode2.has(mode1);
  }

  static fromString(modeValue: string): CodeIDEMode {
    switch (modeValue) {
      case ProgramMode.write + "-" + GraphMode.auto:
        return CodeIDEMode.programWriteGraphAuto;
      case ProgramMode.write:
        return CodeIDEMode.programWrite;
      case ProgramMode.read:
        return CodeIDEMode.programRead;
      case GraphMode.auto:
        return CodeIDEMode.graphAuto;
      case GraphMode.input:
        return CodeIDEMode.graphInput;
      case GraphMode.read:
        return CodeIDEMode.graphRead;
      default:
        return CodeIDEMode.default;
    }
  }
}

export default CodeIDEMode;
