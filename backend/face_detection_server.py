from flask import Flask
from flask_cors import CORS

# Import application modules
from app.config.settings import Config
from app.routes.detection_routes import init_detection_routes
from app.routes.common_routes import init_common_routes

app = Flask(__name__)
CORS(app)

# Initialize routes
init_detection_routes(app)
init_common_routes(app)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)