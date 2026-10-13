@echo off
echo ========================================
echo   Currency Converter Test Launcher
echo ========================================
echo.
echo Starting local server on port 8000...
echo.
start http://localhost:8000/test-converter-simple.html
echo.
echo Opening test page in your browser...
echo.
echo If the page doesn't open, manually visit:
echo http://localhost:8000/test-converter-simple.html
echo.
echo Press any key to start the Python server...
pause > nul
python -m http.server 8000
