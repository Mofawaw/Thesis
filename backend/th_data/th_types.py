from dataclasses import dataclass, field
from typing import Optional, List, Union, Dict

@dataclass
class CodeIDEConfig:
    main: bool
    scope_id: str
    config: Dict[str, Union[str, bool]]

@dataclass
class ThBaseNodeData:
    title: Optional[str] = None
    size: str # "small" | "medium" | "large"
    code_ide: Optional[CodeIDEConfig] = None

@dataclass
class ThBaseNode:
    id: str
    type: str # "codeIDE" | "text" | "tutorial"
    data: ThBaseNodeData

@dataclass
class ThCategory:
    id: str # "c1" | "c2" | "c3"
    label: str
    base_nodes_id: List[str]
    base_tipp_nodes_id: List[str]
    expected: str # "output" | "graph"

@dataclass
class ThLevel:
    id: str
    stage_id: str 
    category_id: str 
    label: str
    nodes_id: List[str] 
    tipp_nodes_id: List[str]
    expected: Dict[str, Union[str, Dict]]

@dataclass
class ThStage:
    id: str  # "s1" | "s2" | "s3"
    label: str
    color: str
    logo: str # "castle-value" | "castle-reference" | "castle-together"
    levels_id: List[str] 

@dataclass
class ThNodeData:
    initial_code: Optional[str] = None
    initial_graph: Optional[Dict] = None
    description: Optional[str] = None
    color: Optional[str] = None

@dataclass
class ThNode:
    base_node_id: str 
    data: ThNodeData