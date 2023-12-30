import ast
import inspect
from memory_helper import MemoryHelper
            
class MemoryGraph:
    def __init__(self):
        self.variables = dict()
        self.objects = dict()

    def add_variable(self, name, value, code_objects):
        if MemoryHelper.is_immutable(value):
            self.variables[name] = {"value": value}
        elif MemoryHelper.is_mutable(value):
            obj_id = id(value)
            self.variables[name] = {"objectid": obj_id}
            if obj_id not in self.objects:
                self.objects[obj_id] = {"type": type(value).__name__, "value": value, "deallocated": 0, "order": -1}
            if obj_id not in code_objects:
                code_objects[obj_id] = len(code_objects)

    def mark_deallocated(self, previous_graph):
        for obj_id in previous_graph.objects:
            if obj_id not in self.objects:
                self.objects[obj_id] = previous_graph.objects[obj_id]
                self.objects[obj_id]["deallocated"] = 1

    def sort_objects_by_order(self):
        self.objects = sorted(self.objects.items(), key=lambda x: x[1]["order"]) if self.objects else {}

class MemoryCompiler:
    def __init__(self):
        self.__graphs = []
        self.__final_graph = MemoryGraph()

    def _reset(self):
        self.__graphs = []
        self.__final_graph = MemoryGraph()

    def _execute(self, node, variables):
        code = compile(ast.Module(body=[node], type_ignores=[]), filename="<ast>", mode="exec")
        exec(code, {}, variables)

    def _analyze(self, code, code_variables, code_objects):
        tree = ast.parse(code)

        for node in ast.iter_child_nodes(tree):
            graph = MemoryGraph()
            previous_graph = self.__graphs[-1] if self.__graphs else MemoryGraph()

            self._execute(node, code_variables)

            for var_name, var_value in code_variables.items():
                if not (inspect.isclass(var_value) or inspect.isfunction(var_value) or inspect.ismodule(var_value)):
                    graph.add_variable(var_name, var_value, code_objects)

            if previous_graph:
                graph.mark_deallocated(previous_graph)

            self.__graphs.append(graph)
    
    def generate_memory_graph_for(self, code):
        self._reset()
        code_variables = dict()
        code_objects = dict()

        self._analyze(code, code_variables, code_objects)

        self.__final_graph = self.__graphs[-1] if self.__graphs else MemoryGraph()

        for obj_id in self.__final_graph.objects:
            if obj_id in code_objects:
                self.__final_graph.objects[obj_id]["order"] = code_objects[obj_id]

        self.__final_graph.sort_objects_by_order()

    def get_memory_graph(self):
        return self.__final_graph