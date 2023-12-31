import json
from memory_helper import MemoryHelper
from memory_compiler import MemoryGraph

class MemoryEncoderManager:
    def encode_debug(self, graph):
        return json.dumps(graph, indent=4, cls=_DebugMemoryEncoder)
    
    def encode_ui(self, graph):
        return json.dumps(graph, indent=4, cls=_UIMemoryEncoder)
    
    def encode_graph(self, graph):
        return json.dumps(graph, indent=4, cls=_GraphMemoryEncoder)

class _DebugMemoryEncoder(json.JSONEncoder):
    def default(self, obj):
        if MemoryHelper.is_mutable(obj) and not MemoryHelper.is_listtype(obj):
            try:
                return obj.__dict__
            except AttributeError:
                return str(obj)
        return str(obj)
    
class _UIMemoryEncoder(json.JSONEncoder):
    def default(self, graph):
        if isinstance(graph, MemoryGraph):
            return self._apply_ui_format(graph)

    def _apply_ui_format(self, graph):
        graph_ui = {
            "valuetypes": self._extract_value_types(graph.variables),
            "referencetypes": self._extract_reference_types(graph.variables, graph.objects)
        }
        return graph_ui

    def _extract_value_types(self, variables):
        return {name: details['value'] for name, details in variables.items() if 'value' in details}

    def _extract_reference_types(self, variables, objects):
        reference_types = {}
        for objectid, obj in objects:
            obj_names = self._get_object_names(obj, objectid, variables)
            object_value = self._get_object_value(obj)
            for obj_name in obj_names:
                reference_types[obj_name] = object_value
        return reference_types

    def _get_object_names(self, obj, objectid, variables):
        if obj["deallocated"]:
            return ["#" + str(obj["order"]) + "dealloc"]
        else:
            return [name for name, var in variables.items() if var.get("objectid") == objectid]

    def _get_object_value(self, obj):
        if MemoryHelper.is_listtype(obj["value"]):
            return str(obj["value"])
        else:
            return obj["type"] + "(" + ", ".join(map(repr, obj["value"].__dict__.values())) + ")"
        
class _GraphMemoryEncoder(json.JSONEncoder):
    def default(self, graph):
        if isinstance(graph, MemoryGraph):
            return self._apply_graph_format(graph)

    def _apply_graph_format(self, graph):
        graph_graph = {
            "nodes": self._extract_nodes(graph.variables, graph.objects),
            "edges": self._extract_edges(graph.variables, graph.objects)
        }
        return graph_graph

    def _extract_nodes(self, variables, objects):
        nodes = []
        value_counter, reference_counter = 0, 0

        # Stack variables & Heap values
        for name, details in variables.items():
            if 'value' in details:
                nodes.append({
                    "id": f"vs-{value_counter}",
                    "type": "value-stack",
                    "label": name
                })
                nodes.append({
                    "id": f"vh-{value_counter}",
                    "type": "value-heap",
                    "label": details['value']
                })
                value_counter += 1
            elif 'objectid' in details:
                nodes.append({
                    "id": f"rs-{reference_counter}",
                    "type": "reference-stack",
                    "label": name
                })
                reference_counter += 1

        # Heap objects
        for _, obj in objects:
            node_id = "rhd" if obj['deallocated'] else "rh"
            node_type = "heap-deallocated" if obj['deallocated'] else "heap"
            nodes.append({
                "id": f"{node_id}-{obj['order']}",
                "type": f"reference-{node_type}",
                "label": self._get_object_value(obj)
            })

        return nodes

    def _extract_edges(self, variables, objects):
        edges = []
        value_edge_counter, reference_edge_counter = 0, 0

        # Value edges
        for name, details in variables.items():
            if 'value' in details:
                edges.append({
                    "id": f"v-{value_edge_counter}",
                    "type": "value",
                    "source": f"vs-{value_edge_counter}",
                    "target": f"vh-{value_edge_counter}"
                })
                value_edge_counter += 1

        # Reference edges
        object_order_mapping = {obj_id: obj['order'] for obj_id, obj in objects}
        for name, details in variables.items():
            if 'objectid' in details:
                object_order = object_order_mapping.get(details['objectid'], None)
                if object_order is not None:
                    edges.append({
                        "id": f"r-{reference_edge_counter}",
                        "type": "reference",
                        "source": f"rs-{reference_edge_counter}",
                        "target": f"rh-{object_order}"
                    })
                    reference_edge_counter += 1

        return edges

    def _get_object_value(self, obj):
        if MemoryHelper.is_listtype(obj["value"]):
            return str(obj["value"])
        else:
            return obj["type"] + "(" + ", ".join(map(repr, obj["value"].__dict__.values())) + ")"