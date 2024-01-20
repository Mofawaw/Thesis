from typing import Optional, List, Union, Dict
from .th_types import ThCategory, ThBaseNode, ThBaseNodeData, CodeIDEConfig

categories: List[ThCategory] = [
    ThCategory(
        id="c1",
        label="Coding Challenge",
        base_nodes_id=["c-ide-1", "c-text-1"],
        base_tipp_nodes_id=["ti1", "ti2", "ti3"],
        expected="output"
    ),
    ThCategory(
        id="c2",
        label="Code The Memory",
        base_nodes_id=["c-ide-1", "c-ide-2", "c-text-1"],
        base_tipp_nodes_id=["ti1", "ti2", "ti3"],
        expected="graph"
    ),
    ThCategory(
        id="c3",
        label="Memory From Code",
        base_nodes_id=["c-ide-1", "c-ide-2", "c-text-1"],
        base_tipp_nodes_id=["ti1", "ti2", "ti3"],
        expected="graph"
    )
]

base_nodes_c1 = [
  ThBaseNode(id="c-ide-1", type="codeIDE", data=ThBaseNodeData(size="large", code_ide=CodeIDEConfig(main=True, scope_id="c-ide-1", config={"type": "program+graph", "mode": "write", "runnable": True}))), 
  ThBaseNode(id="c-text-1", type="text", data=ThBaseNodeData(title="Aufgabe", size="small"))
]
base_tipp_nodes_c1 = [
  ThBaseNode(id="ti1", type="text", data=ThBaseNodeData(title="Tipp 1", size="small")), 
  ThBaseNode(id="ti2", type="codeIDE", data=ThBaseNodeData(title="Tipp 2", size="small", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-1", config={"type": "program", "mode": "write", "runnable": True}))), 
  ThBaseNode(id="ti3", type="codeIDE", data=ThBaseNodeData(title="Lösung", size="large", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-2", config={"type": "program+graph", "mode": "read", "runnable": True})))
]

base_nodes_c2 = [
  ThBaseNode(id="c-ide-1", type="codeIDE", data=ThBaseNodeData(size="small", code_ide=CodeIDEConfig(main=False, scope_id="c-ide-1", config={"type": "graph", "mode": "read", "runnable": False}))), 
  ThBaseNode(id="c-ide-2", type="codeIDE", data=ThBaseNodeData(size="medium", code_ide=CodeIDEConfig(main=True, scope_id="c-ide-2", config={"type": "program", "mode": "write", "runnable": True}))), 
  ThBaseNode(id="c-text-1", type="text", data=ThBaseNodeData(title="Aufgabe", size="small"))
]
base_tipp_nodes_c2 = [
  ThBaseNode(id="ti1", type="codeIDE", data=ThBaseNodeData(title="Tipp 1", size="small", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-1", config={"type": "program", "mode": "write", "runnable": True}))), 
  ThBaseNode(id="ti2", type="codeIDE", data=ThBaseNodeData(title="Tipp 2", size="small", code_ide=CodeIDEConfig(main=False, scope_id="c-ide-2", config={"type": "graph", "mode": "read", "runnable": False}))), 
  ThBaseNode(id="ti3", type="codeIDE", data=ThBaseNodeData(title="Lösung", size="medium", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-2", config={"type": "program", "mode": "read", "runnable": True})))
]

base_nodes_c3 = [
  ThBaseNode(id="c-ide-1", type="codeIDE", data=ThBaseNodeData(size="small", code_ide=CodeIDEConfig(main=False, scope_id="c-ide-1", config={"type": "program", "mode": "read", "runnable": False}))), 
  ThBaseNode(id="c-ide-2", type="codeIDE", data=ThBaseNodeData(size="medium", code_ide=CodeIDEConfig(main=True, scope_id="c-ide-2", config={"type": "graph", "mode": "write", "runnable": False}))), 
  ThBaseNode(id="c-text-1", type="text", data=ThBaseNodeData(title="Aufgabe", size="small"))
]
base_tipp_nodes_c3 = [
  ThBaseNode(id="ti1", type="codeIDE", data=ThBaseNodeData(title="Tipp 1", size="small", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-1", config={"type": "program", "mode": "write", "runnable": True}))), 
  ThBaseNode(id="ti2", type="codeIDE", data=ThBaseNodeData(title="Tipp 2", size="small", code_ide=CodeIDEConfig(main=False, scope_id="c-ide-2", config={"type": "graph", "mode": "read", "runnable": True}))), 
  ThBaseNode(id="ti3", type="codeIDE", data=ThBaseNodeData(title="Lösung", size="medium", code_ide=CodeIDEConfig(main=False, scope_id="t-ide-2", config={"type": "graph", "mode": "read", "runnable": False})))
]
