export enum ProgramMode {
  read = "program-read",
  write = "program-write"
}

export enum GraphMode {
  read = "graph-read",
  write = "graph-input"
}

enum CodeIDEMode {
  programWriteGraphRead = ProgramMode.write + "-" + GraphMode.read,
  programWrite = ProgramMode.write,
  programRead = ProgramMode.read,
  graphWrite = GraphMode.write,
}

export default CodeIDEMode;
