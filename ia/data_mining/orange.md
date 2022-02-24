https://orangedatamining.com/
App gráfica para realizar data mininig

Widgets https://orangedatamining.com/widget-catalog/
Para cargar datos, visualizar, etc

# Upgrade
Desde la app, Options > AddOns podemos actualizar el propio orange y sus AddOns.

# Local
Instalado con pyenv usando python 3.8.6
Da problemas la UI.
Arranca bien, pero luego se queda congelada a los pocos segundos.
Problemas con i3?

# Arch
aur/python-orange

# Imagen de docker
https://hub.docker.com/r/acopar/orange-docker

Versión un poco antigua. No puedo actualizar desde la app.
Seguramente si pueda jugando con apt y conda.

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


Para usarlo, crear un "SQL Table", para conectar con una db y elegir una tabla o query.
Luego conectarle un "Data table" para extraer los datos.
Conectar la data table con un "cablecito" (pinchar en el lateral del icono) al sql table.
