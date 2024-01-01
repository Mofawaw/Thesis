from memory_compiler import MemoryCompiler
from memory_encoder import MemoryEncoderManager
import sys
import ast

# Precompiler
class RemovePrints(ast.NodeTransformer):
    def visit_Expr(self, node):
        if isinstance(node.value, ast.Call) and isinstance(node.value.func, ast.Name):
            if node.value.func.id == 'print':
                return None
        return node

def remove_print_statements(code):
    try:
        tree = ast.parse(code)
        modified_tree = RemovePrints().visit(tree)
        ast.fix_missing_locations(modified_tree)
        return ast.unparse(modified_tree)
    except Exception as e:
        raise ValueError(f"Error processing code: {e}")

def validate_code(code):
    try:
        ast.parse(code)
        compile(code, '<string>', 'exec')
    except (SyntaxError, ValueError) as error:
        raise ValueError(f"Precompile Error: {error}")
    return True

if __name__ == "__main__":
    code = sys.argv[1]

    try:
        validate_code(code)
        code = remove_print_statements(code)
    except ValueError as error:
        print(error, file=sys.stderr)
        sys.exit(1)

    # Algorithm
    compiler = MemoryCompiler()
    encoder = MemoryEncoderManager()

    compiler.generate_memory_graph_for(code)
    memory_graph = compiler.get_memory_graph()
    memory_graph_json = encoder.encode_graph(memory_graph)

    # Output
    print(memory_graph_json)