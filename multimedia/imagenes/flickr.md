Obtener api key en: https://www.flickr.com/services/apps/by/NOMBREUSUARIO

## flickr-cli
https://hub.docker.com/r/thefox21/flickr-cli/


## flickrbackup ##
Hacer backup de las fotos de flickr a local

## DFO ##
Excepción y peta

## FrogR ##
Parece que no conecta a flickr

## FlickerFS ##
 https://sites.google.com/site/manishrjain/flickrfs

flickrfs - file system de las fotos de flickr

No autentifica bien con google chrome. Apuntar /usr/bin/x-www-browser a firefox
Cargar el modulo fuse: sudo modprobe fuse
Crear el mountpoint: mkdir /home/adrian/Imágenes/flickr
Arrancar flickrs: flickrfs /home/adrian/Imágenes/flickr

Editar el fichero de configuración: ~/.flickrfs/config.txt
browser:/usr/bin/firefox
image.size:  (en blanco, para que coja la resolución actual de las fotos)
add.default.tag:yes  (para que ponga la tag flickrfs por defecto)


Leer el man, donde viene toda la documentación muy completa.


Para subir fotos (lo de yyyy-mes lo pongo yo para poder ordenar las fotos):
mkdir /home/adrian/Imágenes/flickr/sets/yyyy-mes-nombre/
cp fotos-a-subir/* /home/adrian/Imágenes/flickr/sets/yyyy-mes-nombre/

Ejemplo:
mkdir ~/Imágenes/flickr/sets/2013-junio-Galayos
cp ~/Dropbox/galayos\ jun\'13/* ~/Imágenes/flickr/sets/2013-junio-Galayos/

Velocidad de subida: 100MB - 10'
