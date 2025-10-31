from app.server_factory import create_app
from app.config.settings import Config

app, face_model, encoding_cache = create_app(enhanced=False)

if __name__ == '__main__':
    app.run(debug=Config.DEBUG, host=Config.HOST, port=Config.PORT)