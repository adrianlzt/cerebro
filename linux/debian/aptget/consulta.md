A que paquete pertenece:
dpkg -S /usr/bin/comando

Información sobre un paquete ya instalado:
dpkg -s paquete

Muestra toda la info de los paquetes (como la salida de apt-cache show <pkg>):
apt-cache search -f <pkg>
