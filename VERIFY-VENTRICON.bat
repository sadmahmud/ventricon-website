@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Dependencies are not installed.
  echo Run START-VENTRICON.bat first.
  pause
  exit /b 1
)
call npm run verify
pause
