@echo off
echo Starting Enhanced Face Recognition Server...
cd /d "%~dp0..\backend"
python enhanced_face_api_server.py
pause