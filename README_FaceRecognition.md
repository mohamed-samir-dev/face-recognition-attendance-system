# Face Recognition Login System

## Overview
This system provides face recognition capabilities using your image dataset with 4 people: ahmed, elkholy, mohamed, and samier.

## Components
1. **face_recognition_model.py** - Core AI model for face recognition
2. **face_api_server.py** - Flask API server
3. **face_login.html** - Web interface for face login
4. **requirements_face.txt** - Python dependencies

## Quick Start

### Option 1: Automatic Setup
Run the batch file:
```
setup_and_run.bat
```

### Option 2: Manual Setup
1. Install dependencies:
```
pip install -r requirements_face.txt
```

2. Train the model:
```
python face_recognition_model.py
```

3. Start the API server:
```
python face_api_server.py
```

4. Open `face_login.html` in your browser

## Usage
1. Click "Start Camera" to activate your webcam
2. Position your face in the frame
3. Click "Capture & Login" to recognize your face
4. The system will display your name if recognized

## API Endpoints
- `POST /recognize` - Recognize face from base64 image
- `POST /retrain` - Retrain the model
- `GET /health` - Health check

## Troubleshooting
- Ensure your webcam is connected and working
- Make sure the API server is running on port 5000
- Check that your face images are clear and well-lit