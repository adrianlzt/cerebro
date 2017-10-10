https://docs.docker.com/reference/builder/#volume
http://www.docker.io/learn/dockerfile/level1/
http://docs.docker.com/articles/dockerfile_best-practices/
https://resources.codeship.com/ebooks/dockerfile-guide
ejemplos:
  https://github.com/search?q=dockerfile&ref=cmdform
  https://github.com/CentOS/CentOS-Dockerfiles
  https://github.com/docker-library/postgres/blob/e616341507a7beec3a161b0a366ba0d3400328fd/9.4/Dockerfile

mirar multistage_builds.md para ver como hacer Dockerfiles más sencillos eliminando el problema de las dependencias
mirar Makefile

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
docker build -f midockerfile .  (usando otro fichero como Dockerfile)
docker build - < Dockerfile (con esta forma no me funcionan los ADD)
docker build github.com/creack/docker-firefox  (hará automáticamente un git clone de ese repo y usará el Dockerfile que estará dentro)

Por defecto la imagen creada no tendrá nombre. Se lo podemos asignar con:
docker tab <container-id> NOMBRE

Para meter repos:
RUN sed 's/main$/main universe/' -i /etc/apt/sources.list  (activar repo universe en Ubuntu)
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN rpm -Uhv http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

Instalar rpms:
RUN rpm --rebuilddb && yum install -y sudo npm tar && yum clean all

Para ejecutar como otro user:
run su - contint -c "comando"


Acordarse de actualizar los metadatos
Ubuntu: apt-get update
CentOS: yum check-update


ENTRYPOINT: realizar acciones en el arranque de la máquina 
Ejemplo, ejecutar un comando cuando arranque la máquina. 
FROM base
ENTRYPOINT ["echo", "Hola mundo"]

Si ponemos: ENTRYPOINT comando, el pondrá ["sh", "-c", "comando"] (lo mismo con CMD)

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

Modificar al arrancar el entrypoint:
docker run -t -i --entrypoint="/bin/bash" imagen



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



### BEST PRACTICES ###
http://docs.docker.com/articles/dockerfile_best-practices/
http://crosbymichael.com/dockerfile-best-practices.html

* Mantener la mayor parte del comienzo del fichero Dockerfile común, de esta manera las nuevas imágenes empezarán a partir de la nueva instrucción, y no tendrán que rehacer los primeros pasos (apt-get update por ejemplo)
Personalmente organizo:
  FROM ubuntu / centos:centos6 / centos
  MAINTAINER Blabla Blabla <correo@dom.com> (debe ir después del FROM)
  
  Instalar repos # Date: yyyy-mm-dd (lo del date es por si queremos borrar la cache y que se baje los nuevos paquetes, en vez de usar ENV)
  
  Paquetes adicionales (EPEL, repos extras)
  
  Software a instalar, unir varias instalaciones en un solo RUN. Siempre limiar la cache tras instalar
  (si hacemos varios RUN para instalar paquetes y luego limpiamos cache de yum, esta cache se queda almacenada en alguno de los commits)

* Cuidado con los ADD, que no se cachean. Parece que si desde la 0.8. se hace un checksum del fichero para decidir si debe meterse de nuevo

* Nunca 'expose' el puerto público, ya que no podríamos correr dos containers iguales (querrían ocupar el mismo puerto en la máquina hoster)

* CMD y ENTRYPOINT siempre juntos. Si el entrypoint debe recibir parámetros, poner en el CMD la ayuda (--help), para en el caso de que no se pase nada, se muestre.
* Podría ir solo CMD o ENTRYPOINT si no hay params que pasar.




# Hacer una imagen base
Si estamos creando una imagen que sirva como base para otras imagenes tal vez nos interese el parametro ONBUILD
https://docs.docker.com/engine/reference/builder/#onbuild

Este parametro configura triggers que se dispararán cuando la imagen se construya siendo la base de otra.

Por ejemplo, podemos tener:
ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src

Que cuando alguien use esta imagen como base, automaticamente se metera el workdir en /app/src y se hará un build

Ejemplo: https://github.com/fluent/fluentd-docker-image/blob/master/v0.14/debian-onbuild/Dockerfile

Una parte mala es que si en nuestro Dockerfile tenemos instrucciónes de RUN, siempre que se modifique alguno de los ficheros que mete el ONBUILD, tocará rehacer nuestros RUN.
No podremos cachear el RUN porque el ONBUILD siempre estará delante.
