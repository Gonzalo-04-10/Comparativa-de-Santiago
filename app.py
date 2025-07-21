import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'upload'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    evento = request.args.get('evento', 'evento_generico')
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    timestamp = int(datetime.now().timestamp() * 1000)
    evento_folder = os.path.join(UPLOAD_FOLDER, evento)
    os.makedirs(evento_folder, exist_ok=True)

    save_path = os.path.join(evento_folder, f"{timestamp}-{filename}")
    file.save(save_path)

    return jsonify({'message': 'File uploaded successfully'})

if __name__ == "__main__":
    app.run()
