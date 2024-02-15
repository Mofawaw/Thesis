import TutorialCodeIDE from "./tutorial-codeide";

const TutorialValue: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p>(1) Speichern den Wert <i>direkt</i>:</p>
        <TutorialCodeIDE height={40} scopeId={"tu-val-1"} mode="read" code={"x = 1"} />
        <TutorialCodeIDE height={60} scopeId={"tu-val-2"} mode="read" code={"x = 1\nx = 5"} />
      </div>

      <div className="flex flex-col gap-3">
        <p>(2) <i>Immutable</i>: Kann nicht modifiziert werden, es wird stets <i>überschrieben</i>.</p>
      </div>

      <div className="flex flex-col gap-3">
        <p>(3) Mehrere Variablen: Kopieren den Wert der anderen Variable:</p>
        <TutorialCodeIDE height={100} scopeId={"tu-val-3"} mode="read" code={"x = 1\ny = -1\n\ny = x"} />
      </div>

      <div className="flex flex-col gap-3">
        <p>Probiers aus!</p>
        <TutorialCodeIDE height={450} scopeId={"tu-val-4"} mode="write" code={"# Edit me!\n\nx = 1\ny = -1\n\ny = x\n\n\n\n"} />
      </div>
    </div>
  )
}

export default TutorialValue;