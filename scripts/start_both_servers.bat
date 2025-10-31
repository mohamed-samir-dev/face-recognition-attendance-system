@echo off
echo Starting Face Recognition Attendance System...
echo.

echo Starting Enhanced Face Recognition Server (Port 5001)...
start "Enhanced Face Recognition Server" cmd /k "cd /d "%~dp0..\backend" && python enhanced_face_api_server.py"

echo Starting Next.js Frontend (Port 3000)...
start "Next.js Frontend" cmd /k "cd /d "%~dp0..\frontend" && npm run dev"

echo.
echo Both servers are starting...
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5001
echo.
pause