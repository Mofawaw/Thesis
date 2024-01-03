export enum ProgramMode {
  write = "program-write",
  static = "program-static"
}

export enum GraphMode {
  auto = "graph-auto",
  input = "graph-input",
  static = "graph-static"
}

enum CodeIDEMode {
  programWriteGraphRead = ProgramMode.write + "-" + GraphMode.auto,

  programWrite = ProgramMode.write,
  programStatic = ProgramMode.static,

  graphStatic = GraphMode.static,
  graphInput = GraphMode.input,
}

export default CodeIDEMode;
