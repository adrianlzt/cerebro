Usage: docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]

docker run --rm -P --name=pepe CONTENEDOR
  corre el CONTENEDOR con el nombre 'pepe' exportando los puertos que estén como EXPOSE en el dockerfile.
  se borra el container cuando lo finalicemos

docker run -d -P --name=pepe CONTENEDOR
  como antes, pero se pone en daemon. No se borra el container al final (no se puede poner --rm con -d)

Run a command in a new container

  -a=map[]: Attach to stdin, stdout or stderr.
  -c=0: CPU shares (relative weight)
  -cidfile="": Write the container ID to the file
  -d=false: Detached mode: Run container in the background, print new container id
  -e=[]: Set environment variables
  -h="": Container host name
  -i=false: Keep stdin open even if not attached
  -privileged=false: Give extended privileges to this container
  -m=0: Memory limit (in bytes)
  -n=true: Enable networking for this container
  -p=[]: Map a network port to the container
  -t=false: Allocate a pseudo-tty
  -u="": Username or UID
  -dns=[]: Set custom dns servers for the container
  -v=[]: Create a bind mount with: [host-dir]:[container-dir]:[rw|ro]. If "host-dir" is missing, then docker creates a new volume.
  -volumes-from="": Mount all volumes from the given container.
  --entrypoint="": Overwrite the default entrypoint set by the image.
  -w="": Working directory inside the container
  -lxc-conf=[]: Add custom lxc options -lxc-conf="lxc.cgroup.cpuset.cpus = 0,1"

No podemos usarlo para arrancar scripts de init.d/ porque no detectará el proceso arrancado y se apagará.

Correr una shell en un container:
sudo docker run -i -t ubuntu /bin/bash
  -i=false: Keep stdin open even if not attached
  -t=false: Allocate a pseudo-tty

Si quiero entrar a una imagen pero tiene un entrypoint y no me deja con el típico: docker run -t -i imagen /bin/bash, puedo hacer:
docker run -t -i --entrypoint="/bin/bash" imagen -i


Correr un mysql:
docker run -d msturm/percona /usr/bin/mysqld_safe
  -d=false: Detached mode: Run container in the background, print new container id

Correr un servicio y mapear un puerto:
docker run -p 80 user/image /usr/bin/httpd
  -p mapea el puerto 80 a uno local. Podemos ver cual con docker ps
  -p 8001:80 mapea el 80 del container al 8001 del host
  -p 192.168.56.1::80 mapea el puerto 80 sobre esa ip del host en un puerto dinámicamente seleccionado
  -p 10.0.3.1:8001:80 mapea el puerto 80 del container sobre el 8001 del host en la ip 10.0.3.1

Mapear puertos sobre interfaz determinada (por defecto monta sobre localhost IPv6):
docker run -ip 192.168.56.1 ...

Mapear un directorio local:
docker run -v="/home/adrian/Documentos/docker/test":"/docker" user/image mount
  -v, nos mapea el directorio local con una unidad nueva en la VM. El directorio local tiene que existir y tener un path completo

Definir las dns (debe ser en el arranque, porque la partición / se monta como ro)
docker run -dns 8.8.8.8 usr/image cmd


El código que devuelve vendrá por el código que de la aplicación que corramos al salir. Esta en el roadmap para la 0.8


Variables de entorno
docker run -e "deep=purple" --rm ubuntu /bin/bash
