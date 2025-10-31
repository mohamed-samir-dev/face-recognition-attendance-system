# Start Servers Manually

## You need to run BOTH servers for the attendance system to work:

### Server 1: Face Detection (Port 5000)
Open Command Prompt and run:
```cmd
cd "b:\تيست تالت\teest\test-graduationproject"
python face_detection_server.py
```

### Server 2: Face Recognition (Port 5001)  
Open ANOTHER Command Prompt and run:
```cmd
cd "b:\تيست تالت\teest"
python enhanced_face_api_server.py
```

## Verify Servers Are Running:
- Open browser and go to: http://localhost:5000 (should show face detection message)
- Open browser and go to: http://localhost:5001 (should show face recognition message)

## Then test your attendance system in the Next.js app.

## If you get Python errors:
```cmd
pip install flask flask-cors opencv-python pillow face-recognition numpy
```