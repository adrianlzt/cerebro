Instalar respondiendo a yes a todo:
  apt-get install -y paquete

Si un paquete se muestra como retenido (Held Back en inglés), puede ser porque no solo basta con actualizar el paquete.
Para forzar su actualización usaremos:
apt-get dist-upgrade

Ver todos los paquetes de todos los sources
apt-cache madison paquete

Ver todas las versiones de un paquete, dependencias y dependencias inversas (de todos los paquetes, no solo los instalados):
apt-cache showpkg lxc

Instalar un paquete de otra version
Meter en source.list la versión de la que queramos el paquete
deb http://es.archive.ubuntu.com/ubuntu/ raring-updates universe

Mirar con apt-cache showpkg (o madison) que aparecen más versiones

Instalar la versión que queremos:
apt-get install -t raring lxc

Otra forma (esta no soluciona problemas de dependencias):
apt-get install paquete=version


Forzar instalación no importando las dependencias:
dpkg -i --force-depends paquete.deb

Instalar paquete .deb:
dpkg -i /path/to/filename.deb
Si falla por dependencias haremos seguidamente:
apt-get -fy install
Y de nuevo:
dpkg -i /path/to/filename.deb
