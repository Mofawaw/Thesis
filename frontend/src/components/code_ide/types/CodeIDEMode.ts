enum ProgramMode {
  write = "program-write",
  read = "program-static"
}

enum GraphMode {
  auto = "graph-auto",
  input = "graph-input",
  read = "graph-static"
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
}

export default CodeIDEMode;
