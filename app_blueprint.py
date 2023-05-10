from flask import Blueprint, request, jsonify, render_template, current_app, redirect, url_for
from model import predictVideo
import os
from datetime import datetime

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}
VIDEO_MIME_TYPES = {'video/mp4', 'video/avi', 'video/quicktime', 'video/x-matroska'}

app_blueprint = Blueprint('app_blueprint', __name__)

result = {'class': 1, 'accuracy': 90}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def is_video(file):
    return file.mimetype in VIDEO_MIME_TYPES


def get_file_extension(filename):
    return os.path.splitext(filename)[1].lower().strip('.')


@app_blueprint.route('/')
def home():
    return render_template('index.html')


@app_blueprint.route('/upload', methods=['GET'])
def upload():
    return render_template('upload.html')


@app_blueprint.route("/upload", methods=['POST'])
def predict():
    if 'video' not in request.files:
        predictionResult = {'error': 'No file part in the request'}
        return render_template('upload.html', result=predictionResult)

    if int(request.content_length) > 100 * 1024 * 1024:
        predictionResult = {'error': 'File size exceeds the limit of 100 MB.'}
        return render_template('upload.html', result=predictionResult)

    file = request.files['video']

    if file.filename == '':
        predictionResult = {'error': 'No file selected for uploading'}
        return render_template('upload.html', result=predictionResult)

    if not allowed_file(file.filename):
        predictionResult = {'error': 'Invalid file extension. Only .mp4, .avi, .mov and .mkv files are allowed.'}
        return render_template('upload.html', result=predictionResult)

    if not is_video(file):
        predictionResult = {'error': 'File is not a video.'}
        return render_template('upload.html', result=predictionResult)

    filename = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.' + get_file_extension(file.filename)
    path = current_app.config['UPLOAD_FOLDER'] + '/' + filename

    file.save(path)
    predictionResult = predictVideo(path)
    os.remove(path)

    return render_template('upload.html', result=predictionResult)
