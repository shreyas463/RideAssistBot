@echo off
echo =====================================
echo   RideAssistBot - Expo Starter Script
echo =====================================
echo.
echo This script will start the RideAssistBot app with placeholder assets.
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed. Please install Node.js and npm first.
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the app with placeholder assets
echo Starting the app with placeholder assets...
call npm run start-with-placeholders

REM Exit with the same status as the npm command
exit /b %ERRORLEVEL% 