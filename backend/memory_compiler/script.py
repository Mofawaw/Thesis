from memory_compiler import MemoryCompiler
from memory_encoder import MemoryEncoderManager
import sys

code = sys.argv[1]

compiler = MemoryCompiler()
encoder = MemoryEncoderManager()

compiler.generate_memory_graph_for(code)
memory_graph = compiler.get_memory_graph()
memory_graph_json = encoder.encode_graph(memory_graph)

print(memory_graph_json)