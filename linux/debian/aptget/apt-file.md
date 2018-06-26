Para isntalar apt-file:
apt install apt-file

apt-file update
  para bajarnos los datos para poder realizar consultas


apt-file list paquete
Muestra todos los ficheros que se van a instalar de ese paquete

apt-file search fichero
Busca el fichero en todos los paquetes

Con regex:
apt-file search -x "bin/ss$"

Web para buscar:
https://packages.debian.org/search?mode=filename&section=all&searchon=contents&keywords=libboost_thread.so
