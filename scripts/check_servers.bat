@echo off
echo Checking Face Recognition Attendance System...
echo.

echo Checking Next.js Frontend (Port 3000)...
curl -s http://localhost:3000 && echo ✅ Frontend is running || echo ❌ Frontend is NOT running

echo.
echo Checking Face Recognition API (Port 5001)...
curl -s http://localhost:5001 && echo ✅ Face Recognition API is running || echo ❌ Face Recognition API is NOT running

echo.
echo If any server shows ❌, run: start_both_servers.bat
pause