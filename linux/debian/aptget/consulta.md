A que paquete pertenece:
dpkg -S /usr/bin/comando

Información sobre un paquete ya instalado:
dpkg -s paquete

Muestra toda la info de los paquetes (como la salida de apt-cache show <pkg>):
apt-cache search -f <pkg>

dpkg-query para consultar información de paquetes instalados.

dpkg-deb para consultar paquetes .deb
  -I info general y dependencias
  -c contenido del paquete
  -X dir  extrae el contenido al directorio 'dir'
  
