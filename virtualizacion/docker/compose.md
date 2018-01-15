https://docs.docker.com/compose/
https://docs.docker.com/compose/compose-file/

Si usamos docker swarm -> stacks.md
Los compose en swarm solo se despliegan en un nodo (tal vez cambia)

Ejemplo en: compose-example.yml


# Instalacion
pacman -S docker-compose

pip install docker-compose


Aqui cuidado con la version, que puede que esté desactualizada:

Como un container:
curl -L https://github.com/docker/compose/releases/download/1.11.2/run.sh > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose


curl -L https://github.com/docker/compose/releases/download/1.11.2/docker-compose-`uname -s`-`uname -m` > docker-compose
sudo mv docker-compose /usr/local/bin/
sudo chmod +x /usr/local/bin/docker-compose

wget https://raw.githubusercontent.com/docker/compose/1.11.2/contrib/completion/bash/docker-compose
sudo mv docker-compose /etc/bash_completion.d/


# Uso
https://docs.docker.com/compose/compose-file/
Generamos ficheros YAML con una configuración donde decimos que containers levantamos y con que configuraciones.
El fichero deberá llamarse: docker-compose.yml (o especificarlo con -f)


Para levantar un compose:
docker-compose up
Correrá en forergound. Poner -d para mandarlo al background directamente.
Por defecto los containers se llamaran "NOMBREDIR_xxx". Si ya hay otro igual será "NOMBREDIR2_xxx", etc

Para ver los containers del compose (buscará el fichero doccker-compose.yml para saber que mostrar):
docker-compose ps

docker-compose stop

Por defecto creará una nueva red "compose_default" donde unirá los containers.
En esta red los container se pueden comunicar por el nombre usado al crear el service.


# docker-compose.yml

Generalmente en el fichero tendremos una sección "services" con los distintos containers que correremos.
Un container, en vez de apuntar a una imagen, puede tener un "build: .", para construir la imagen a partir de un Dockerfile al hacer el docker-compose up
La imagen se creará primera vez. Para rehacer haremos:
docker-compose build
o
docker-compose up --build


## command
command: bundle exec thin -p 3000

## Variables entorno
Se pueden definir en un fichero .env en el workdir
Estas variables las podremos usar con $VARIABLE en el docker-compose.yml

Si queremos pasar variables de entorno a un container:
web:
  environment:
    - DEBUG=1

web:
  env_file:
    - web-variables.env


## networks
En vez de crear una nueva red, conectar a una ya existente
networks:
  default:
    external:
      name: red_ya_existente



## volumes
Montar un volumen local en varios containers

volumes:
  my-volume:
    driver: local-persist
    driver_opts:
      mountpoint: /data/local-persist/data
