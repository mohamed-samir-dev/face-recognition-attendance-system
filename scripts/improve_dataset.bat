@echo off
echo ========================================
echo Face Recognition Dataset Improvement
echo ========================================
echo.

cd /d "%~dp0\..\ai"

echo Checking dataset quality...
python improve_dataset.py

echo.
echo ========================================
echo Dataset improvement complete!
echo ========================================
echo.
echo Next steps:
echo 1. Review the quality report above
echo 2. Add more photos if recommended
echo 3. Run train_model.bat to retrain
echo.
pause