from flask import Flask
from app_blueprint import app_blueprint
import os

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

app.register_blueprint(app_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
