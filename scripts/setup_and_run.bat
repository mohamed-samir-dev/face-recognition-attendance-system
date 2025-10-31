@echo off
echo Setting up Face Recognition Attendance System...

echo Installing Python dependencies...
cd ..\backend
pip install -r requirements_face.txt
pip install -r requirements_firebase.txt

echo Training the face recognition model...
cd ..\ai
python face_recognition_model.py

echo Starting the enhanced face recognition API server...
cd ..\backend
start "Face API Server" python enhanced_face_api_server.py

echo Starting the Next.js frontend...
cd ..\frontend
npm install
npm run dev

pause