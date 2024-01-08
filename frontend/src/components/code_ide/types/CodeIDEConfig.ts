export default interface CodeIDEConfig {
  type: "program" | "graph" | "program+graph";
  mode: "read" | "write";
  runnable: boolean;
}