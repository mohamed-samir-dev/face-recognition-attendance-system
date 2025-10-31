@echo off
echo Installing Python dependencies...
pip install -r requirements.txt

echo Starting face detection server...
python face_detection_server.py

face-recognition-attendance-system