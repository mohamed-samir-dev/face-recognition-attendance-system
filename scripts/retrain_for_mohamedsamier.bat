@echo off
echo Retraining model with extra flexibility for MohamedSamier...
cd /d "%~dp0\.."
python train_combined_model.py
echo Model updated with improved recognition for MohamedSamier
pause