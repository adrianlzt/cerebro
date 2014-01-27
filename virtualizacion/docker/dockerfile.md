http://www.docker.io/learn/dockerfile/level1/
ejemplos: https://github.com/search?q=dockerfile&ref=cmdform

Fichero estilo Vagrantfile donde se dan una serie de ordenes para generar un container.
IDEA IMPORTANTE: intentar tratar 'docker run user/container' como si fuese un comando, donde le podemos pasar parámetros, nos saca la ayuda en caso de error, etc.

Lo más básico es un FROM para decir la base de donde partimos, y uno o más RUN, comandos que se ejecutan para instalar algo.

Ej.:
FROM ubuntu
RUN apt-get install -y memcached

Al generar el container, por cada RUN se hace automáticamente un commit.


Para generar el container podemos usar:
docker build -t nombre .  (de esta manera asignamos el nombre directamente, evitándonos el comando 'docker tag <id> nombre')
docker build .  (si el Dockerfile esta en el workingdir)
docker build - < Dockerfile
docker build github.com/creack/docker-firefox  (hará automáticamente un git clone de ese repo y usará el Dockerfile que estará dentro)

Por defecto la imagen creada no tendrá nombre. Se lo podemos asignar con:
docker tab <container-id> NOMBRE

Para meter repos:
RUN sed 's/main$/main universe/' -i /etc/apt/sources.list  (activar repo universe en Ubuntu)
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN rpm -Uhv http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

Acordarse de actualizar los metadatos
Ubuntu: apt-get update
CentOS: yum check-update


ENTRYPOINT: realizar acciones en el arranque de la máquina 
Ejemplo, ejecutar un comando cuando arranque la máquina. 
FROM base
ENTRYPOINT ["echo", "Hola mundo"]

docker run eseDockerfile   # arrancará, ejecutará ese mensaje y se cerrará

Esta instrucción la queremos utilizar para configurar containers que funcionen como un ejecutable.

La máquina puede leer de stdin, así por ejemplo podríamos crear la máquina
FROM base
ENTRYPOINT ["wc", "-l"]

Y hacer: cat fichero | docker run -i maquina
Esta ejecución nos contaría las líneas del fichero
NO usar la forma "ENTRYPOINT comando params", pues tener efectos no deseados -> 4. http://crosbymichael.com/dockerfile-best-practices.html.

ENTYPOINT se define si siempre vamos a tener una parte común en la ejecución. Por ejemplo:
programa -arg1 -arg2
Si siempre vamos a ejecutar 'programa' haremos:
ENTRYPOINT ["programa"]
CMD ["--help"]
Y arrancaremos la máquina como: docer run user/container --arg3 --arg4


CMD: comando a ejecutar cuando se arranca la máquina.
Si hay un entrypoint CMD sirve como parámetros por defecto.
docker run user/container AQUI PARAMS
Si solo definimos CMD, y pasamos parámetros a docker run, estos substituirán al CMD.
Ejemplo:
  CMD ["echo hola"]
  docker run image echo hello <- hello


USER: nos sirve para determinar con que usuario se ejecutará el ENTRYPOINT


WORKDIR: path donde se ejecutará CMD o ENTRYPOINT


EXPOSE: nos sirve para publicar puertos en la máquina donde corre el container. El puerto lo podremos conocer mediante docker ps


ENV: pasar variables de entorno al programa
ENV <key> <value>


ADD: añadir ficheros al container
ADD <src> <dest>
src debe ser un fichero o directorio con path relativo al workdir actual, o una url


### BEST PRACTICES ###
http://crosbymichael.com/dockerfile-best-practices.html

* Mantener la mayor parte del comienzo del fichero Dockerfile común, de esta manera las nuevas imágenes empezarán a partir de la nueva instrucción, y no tendrán que rehacer los primeros pasos (apt-get update por ejemplo)
Personalmente organizo (la primera linea fuerza a rehacer el cache (ADD no se cachea), necesario si hace mucho que hicimos la cache y queremos obtener los nuevos paquetes):
  ENV REFRESHED_AT YYYY_MM_DD

  Partes del SO
  FROM ...
  MAINTAINER (debe ir después del FROM)
  
  Paquetes adicionales (EPEL, repos extras)
  
  Software a instalar

* Nunca 'expose' el puerto público, ya que no podríamos correr dos containers iguales (querrían ocupar el mismo puerto en la máquina hoster)

* CMD y ENTRYPOINT siempre juntos. Si el entrypoint debe recibir parámetros, poner en el CMD la ayuda (--help), para en el caso de que no se pase nada, se muestre.
* Podría ir solo CMD o ENTRYPOINT si no hay params que pasar.
