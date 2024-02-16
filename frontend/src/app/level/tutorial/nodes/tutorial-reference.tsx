import TutorialCodeIDE from "./tutorial-codeide";

const TutorialReference: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p>(1) Speichern eine Referenz auf das Objekt:</p>
        <TutorialCodeIDE height={40} scopeId={"tu-ref-1"} mode="read" code={"x = [1, 2]"} />
        <TutorialCodeIDE height={80} scopeId={"tu-ref-2"} mode="read" code={"x = [1, 2]\nx = [5]"} />
      </div>

      <div className="flex flex-col gap-3">
        <p>(2) <i>Mutable</i>: Kann modifiziert werden:</p>
        <TutorialCodeIDE height={60} scopeId={"tu-ref-3"} mode="read" code={"x = [1, 2]\nx.append(3)"} />
      </div>

      <div className="flex flex-col gap-3">
        <p>(3) Mehrere Variablen: Kopieren die Referenz der anderen Variable:</p>
        <TutorialCodeIDE height={100} scopeId={"tu-ref-4"} mode="read" code={"x = [1, 2]\ny = [-1]\n\ny = x"} />
        <TutorialCodeIDE height={170} scopeId={"tu-ref-5"} mode="read" code={"x = [1, 2]\ny = [-1]\n\ny = x\n\nx.append(3)\ny.append(4)"} />
      </div>

      <div className="flex flex-col gap-3">
        <p>Probiers aus!</p>
        <TutorialCodeIDE height={450} scopeId={"tu-ref-6"} mode="write" code={"# Edit me!\n\nx = [1, 2]\ny = [-1]\n\ny = x\n\nx.append(3)\ny.append(4)\n"} />
      </div>
    </div>
  )
}

export default TutorialReference;