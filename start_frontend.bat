@echo off
echo ========================================
echo Currency Exchange Forecasting System
echo Frontend Server
echo ========================================
echo.
echo Starting Frontend on http://localhost:8000
echo.
echo Make sure Backend is running on http://localhost:5000
echo.

python -m http.server 8000

pause
