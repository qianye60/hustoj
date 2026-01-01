@echo off
echo ========================================
echo   HUSTOJ Sync to PHPStudy
echo ========================================

set SOURCE=C:\Users\15385\Documents\CodeProject\hustoj-25.12.10\trunk\web
set DEST=D:\phpstudy_pro\WWW

echo.
echo Source: %SOURCE%
echo Target: %DEST%
echo.

echo Syncing files...
powershell -Command "Copy-Item -Path '%SOURCE%\*' -Destination '%DEST%\' -Recurse -Force"

echo.
echo ========================================
echo   Sync Complete!
echo ========================================
echo.
echo URL: http://localhost/
echo Welcome: http://localhost/welcome.php
echo Index: http://localhost/index.php
echo.
pause
