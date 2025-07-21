import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from datetime import datetime

import cloudinary
import cloudinary.uploader

app = Flask(__name__)
CORS(app)

# Configuración de Cloudinary (reemplazá con tus datos)
cloudinary.config(
    cloud_name='Root',
    api_key='242495746777566',
    api_secret='sppzK8OEvobLDw9uVrIpqS82T08'
)

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
    public_id = f"{evento}/{timestamp}-{filename}"

    try:
        # Subida directa a Cloudinary
        result = cloudinary.uploader.upload(
            file,
            public_id=public_id,
            folder=evento,
            resource_type="image",
            overwrite=False
        )

        return jsonify({
            'message': 'Imagen subida con éxito a Cloudinary',
            'url': result['secure_url']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run()
