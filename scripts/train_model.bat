@echo off
echo Training Face Recognition Model...
echo.

cd /d "%~dp0..\ai"
python face_recognition_model.py

echo.
echo Model training completed!
pause