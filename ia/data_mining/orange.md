https://orangedatamining.com/
App gráfica para realizar data mininig

Widgets https://orangedatamining.com/widget-catalog/
Para cargar datos, visualizar, etc

Imagen de docker:
https://hub.docker.com/r/acopar/orange-docker

Para arrancar con datos persistentes (net=host para conectar más fácilmente con fuentes de datos):
podman run --name orange --net host -v "$PWD/datasets:/home/orange/datasets" -it acopar/orange-docker

Tuve que modificar los permisos de /home/orange/datasets desde dentro del contenedor.

http://localhost:6901/
Password: orange

O con remmina, conectar con VNC a localhost:5901

# Postgres
https://orangedatamining.com/widget-catalog/data/sqltable/

Hace falta instalar psycopg2

Para hacerlo en la imagen de docker
sudo -s  # necesario?
source /home/orange/bin/activate
conda install psycopg2
