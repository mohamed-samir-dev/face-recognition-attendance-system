@echo off
echo Training AI-Powered Firebase Encodings...
echo ==========================================

cd /d "%~dp0\.."

python train_firebase_encodings.py

echo.
echo Training complete! Firebase AI system ready.
pause