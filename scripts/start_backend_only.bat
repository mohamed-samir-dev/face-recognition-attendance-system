@echo off
echo Starting Backend API Only...
echo.

cd /d "%~dp0..\backend"
python enhanced_face_api_server.py

pause