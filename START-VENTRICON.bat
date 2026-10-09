@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Please make sure Node.js and npm are installed.
    pause
    exit /b 1
  )
)
echo.
echo Starting VENTRICON...
echo Open http://localhost:3000
call npm run dev
