from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import uuid
import os

app = Flask(__name__)
CORS(app)

# Compile Code
@app.route('/compile_get_output', methods=['POST'])
def compile_get_output():
    code = request.json.get('code', '')

    file_name = f"/tmp/{uuid.uuid4()}.py"

    with open(file_name, 'w') as file:
        file.write(code)

    docker_command = [
        "docker", "run", "--rm",
        "-v", f"{file_name}:/usr/src/app/app.py",  
        "-w", "/usr/src/app",  
        "python:3.9",  
        "python", "app.py"
    ]

    try:
        result = subprocess.run(docker_command, capture_output=True, text=True, timeout=10)
        output = result.stdout
        error = result.stderr
    except subprocess.TimeoutExpired:
        output = ''
        error = 'Execution timed out'
    finally:
        os.remove(file_name)

    print("Executed Code:", code)
    print("Output:", output)
    print("Error:", error if error else "No error")

    return jsonify({'output': result.stdout, 'error': result.stderr})

# Retrieve Memory Graph
@app.route('/compile_get_graph', methods=['POST'])
def compile_get_graph():
    code = request.json.get('code', '')

    script_path = "/usr/src/app/memory_compiler/script.py"

    docker_command = [
        "docker", "run", "--rm",
        "-v", f"{os.getcwd()}:/usr/src/app", 
        "-w", "/usr/src/app", 
        "python:3.9",
        "python", script_path, code
    ]

    graph = ''
    error = ''
    try:
        result = subprocess.run(docker_command, capture_output=True, text=True, timeout=10)
        if result.returncode != 0:
            error = result.stderr
        else:
            graph = result.stdout
    except subprocess.TimeoutExpired:
        error = 'Execution timed out'
    except Exception as e:
        error = str(e)

    print("Executed Code:", code)
    print("Memory Graph:", graph)
    print("Error:", error if error else "No error")

    success = not bool(error)

    return jsonify({'success': success, 'graph': graph})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
