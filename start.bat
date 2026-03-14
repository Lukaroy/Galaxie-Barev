@echo off
REM Spustí projekt v Dockeru
cd /d %~dp0
docker-compose up -d --build
pause