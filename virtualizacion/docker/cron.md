https://github.com/rancher/container-crontab

Nos bajamos el binario y lo dejamos ejecutando en segundo plano.

docker run -d --label=cron.schedule="0 * * * * ?" ubuntu:16.04 date

Lanzará el container cada minuto (a los xx:00).
Tambien lo lanza la primera vez que lo ejecutamos.

Lo que hace es arrancar un container, ejecutar el comando.
Luego, cuando salte el cron, le hace un restart y vuelve a ejecutar el comando (internamente no se como hace, pero este es el resultado)



# Supercronic
https://github.com/aptible/supercronic/blob/master/README.md
Correr cron dentro de un container
Programa en go que imita el funcionamiento de cron pero pensado para ejecutarse dentro de un container.
