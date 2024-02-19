import ThIDEButton from "@/components/buttons/th-ide-button.tsx";

import { compileGetCodeOutput, compileGetGraph } from "../code-ide-network.ts";
import useCodeIDEStore from "../code-ide-store.ts";
import CodeIDEConfig, { codeIDELayout } from "../code-ide-config.ts";
import CodeEditor from "./components/code-editor.tsx";
import CodeOutput from "./components/code-output.tsx"

interface CodeProgramProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig;
}

const CodeProgram: React.FC<CodeProgramProps> = ({
  height,
  scopeId,
  config,
}) => {
  const store = useCodeIDEStore(scopeId).getState();
  let codeProgramComponent;
  let codeEditorHeight = codeIDELayout.getCodeEditorHeight(config, height);

  if (!config.runnable) {
    codeProgramComponent = (
      <div className="p-4 mb-2">
        <CodeEditor height={codeEditorHeight} scopeId={scopeId} config={config} />
      </div>
    )
  } else if (config.runnable) {
    codeProgramComponent = (
      <div className="flex flex-col gap-2 py-4 overflow-hidden" >
        <div className="px-4 mb-2">
          <CodeEditor height={codeEditorHeight} scopeId={scopeId} config={config} />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <div className="th-xline px-[-1rem]" />

          <div className="flex flex-row justify-between items-center px-4 h-8">
            <ThIDEButton thColor="th-black" thColorShade={100} icon="run" onClick={() => compileGetCodeOutput(scopeId)} />
            <div className="flex flex-row justify-left gap-2 h-8">
              {config.type === "program+graph" && <ThIDEButton thColor="th-black" thColorShade={30} icon="generate" onClick={() => { compileGetGraph(scopeId) }} />}
              {/* {config.mode === "write" &&
                <ThPopup
                  width={450}
                  height={400}
                  thColor={"th-black"}
                  backgroundClass={"bg-none"}
                  button={<ThIDEButton thColor="th-black" thColorShade={30} icon="reset" onClick={() => setOpenResetPopup(true)} />}
                  isOpen={openResetPopup}
                  onClose={() => setOpenResetPopup(false)}
                >
                  <div className="h-full flex flex-col items-center justify-between p-12">
                    <h3>IDE zurücksetzen</h3>
                    <div className="pb-10">
                      <p className="text-center whitespace-pre-line mt-4">Willst du dein Programm wirklich zurücksetzen?</p>
                      <p className="text-center whitespace-pre-line mt-4">Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
                    </div>
                    <div className="flex flex-row gap-3">
                      <ThMenuTextButton width={200} thColor="th-black" textThColorShade={40} text="Zurücksetzen"
                        onClick={() => {
                          store.setCode(store.initialCode);
                          setOpenResetPopup(false);
                        }}
                      />
                      <ThMenuTextButton width={150} thColor="th-black" text="Abbrechen" onClick={() => setOpenResetPopup(false)} />
                    </div>
                  </div>
                </ThPopup>
              } */}
            </div>
          </div>

          <div className="th-xline" />
        </div>

        <div className="px-4 my-2 overflow-hidden">
          <CodeOutput scopeId={scopeId} config={config} />
        </div>
      </div>
    )
  } else {
    codeProgramComponent = <div>{`No graph mode found. For store: ${store}`}</div>
  }

  return (
    <>
      {codeProgramComponent}
    </>
  );
}

export default CodeProgram;