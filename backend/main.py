from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route('/compile', methods=['POST'])
def run_code():
    code = request.json.get('code', '')

    file_name = f"/tmp/{uuid.uuid4()}.py"

    with open(file_name, 'w') as file:
        file.write(code)

    try:
        result = subprocess.run(["python", file_name], capture_output=True, text=True, timeout=10)
        # result = subprocess.run(["docker", "run", "--rm", "-v", f"{file_name}:/usr/src/app/app.py", "python-sandbox"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
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

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
