https://orangedatamining.com/
App gráfica para realizar data mininig

Widgets https://orangedatamining.com/widget-catalog/
Para cargar datos, visualizar, etc

# Imagen de docker
https://hub.docker.com/r/acopar/orange-docker

Para arrancar con datos persistentes (net=host para conectar más fácilmente con fuentes de datos):
podman run --name orange --net host -v "$PWD/datasets:/home/orange/datasets" -it acopar/orange-docker

Tuve que modificar los permisos de /home/orange/datasets desde dentro del contenedor.

http://localhost:6901/
Password: orange

O con remmina, conectar con VNC a localhost:5901


Ficheros de log que genera orange en la imagen docker
/home/orange/wm.log
/dockerstartup/wm_startup.log
/home/orange/.local/share/Orange/3.23.1/canvas/sql.log
/home/orange/.local/share/Orange/3.23.1/canvas/canvas.log



# Postgres
https://orangedatamining.com/widget-catalog/data/sqltable/

Hace falta instalar psycopg2

Para hacerlo en la imagen de docker
source /home/orange/bin/activate
conda activate orange3
conda install psycopg2

Hace falta instalar la extensión "quantile" en el server de postgres.
Mirar bbdd/postgresql/docker.md para como meterla en un contenedor docker.


Para usarlo, crear un "SQL Table", para conectar con una db.
Luego conectarle un "Data table" para extraer datos de una tabla.
Conectar la data table con un "cablecito" (pinchar en el lateral del icono) al sql table.
