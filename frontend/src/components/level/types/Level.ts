export default interface Level {
  id: string;
  stageId: string;
  categoryId: string;
  label: string;
  task: string;
  initialCode: string;
  initialGraph: string;
  expectedOutput: string;
  expectedGraph: string;
}