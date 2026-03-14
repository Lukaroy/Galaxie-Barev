# Návod pro spuštění projektu Galaxie-Barev přes Docker

1. Ujistěte se, že máte nainstalovaný Docker Desktop (https://www.docker.com/products/docker-desktop/).
2. Otevřete složku projektu.
3. Dvojklikem spusťte soubor start.bat.
4. Po dokončení build procesu bude aplikace dostupná na http://localhost:3000.

Pokud chcete projekt zastavit, spusťte v této složce příkaz:

docker-compose down

Vše potřebné je již připraveno v docker-compose.yml a Dockerfile.
