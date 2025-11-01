@echo off
echo ========================================
echo Training Combined Model (Local + Firebase)
echo ========================================

cd /d "%~dp0\.."

echo Training model with both local dataset and Firebase photos...
python train_combined_model.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Combined model training completed successfully!
    echo Model now includes:
    echo - Local dataset images from ai/image_dataset/
    echo - Firebase user photos
    echo ========================================
) else (
    echo.
    echo ========================================
    echo Training failed! Please check the error messages above.
    echo ========================================
)

pause