@echo off
echo Installing Dependencies for Face Recognition Attendance System...
echo.

echo Installing Python Backend Dependencies...
cd /d "%~dp0..\backend"
pip install -r requirements_face.txt
pip install -r requirements_firebase.txt

echo.
echo Installing Node.js Frontend Dependencies...
cd /d "%~dp0..\frontend"
npm install

echo.
echo Dependencies installed successfully!
echo Run start_both_servers.bat to start the system.
pause