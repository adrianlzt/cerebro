Command line client <------Unix-socket-----> REST server daemon
Se puede cambiar el server para que corra sobre un puerto.

http://docs.docker.io/en/latest/terms/filesystem/

Docker se basa en dos sistemas de ficheros para correr, como típicamente hace linux, bootfs y rootfs.
bootfs se carga para el arranque, se carga el kernel en memoria y se desmonta.
rootfs es donde se encuentran /etc, /lib, /usr, etc
Pueden correrse distintos rootfs sobre el mismo bootfs. (algún ejemplo?)

Layers: si bajamos una imagen de, por ejemplo, nginx, esta se compondrá de distintas layers. Una será la imagen base, otra podría ser una actualización de paquete, otra la instalación de nginx, y por último la configuración de nginx. Cada una de estas capas se le llaman layers.
Excepto la última layer, el resto son readonly. Si intentamos modificar algún fichero de estas layers ro, el fichero realmente se copiará la la última layer (rw), y dará la sensación de que hemos modificado el fichero.

Image: es una layer read only. Una imagen nunca se puede cambiar
Cada imagen nos dice de la que depende.
Una imagen sin dependencias es una "base image"

Container: si arrancamos docker apuntando a una imagen, este se encargará de coger todas las imágenes-dependencias necesarias hasta llegar a la base image. Luego UFS (union file system) pondrá una layer writable en el top.
Esta capa tope más la información de que imagen depende, y du id único, configuración de red y límites en los recursos es a lo que se llama container.
Los containers tienen estado (running or exited)
Si esta corriendo el container también tiene información acerca del arbol de procesos que tienen ejecutándose.
Si se sale del container, el estado del sistema de ficheros se mantiene, por lo que podemos arrancar, parar y reiniciar un container. Si reiniciamos se perderá lo almacenado en memoria.
Si queremos convertir un container en imagen haremos: docker commit.
A partir de ahí podremos usar esta nueva imagen como base para otro container.


