https://www.torproject.org/projects/torbrowser.html.en:set

No hace falta tener el demonio tor corriendo.

En mac subir el ulimit para que pueda arrancar el agente.
# To increase ulimit (e.g. with tor network)
# sudo launchctl limit maxfiles 1000000 1000000



Otra opción es levantar tor:
sudo systemctl start tor

Abrir firefox, configuración de proxy:
Configuración manual de proxy
Borrar las ips de proxy http, ssl y ftp.
En el de socks poner 127.0.0.1 puerto 9050
Seleccionar socks v5 y marcar "DNS remoto"
