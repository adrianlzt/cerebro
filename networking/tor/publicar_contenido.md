Si queremos poner nosotros un servidor en tor, le diremos a tor un directorio de configuración, un puerto donde escuchar, y la ip:puerto donde estará la aplicación escuchando.

Al reiniciar el servidor tor, este nos generará en el directorio una clave privada y un dominio asociado (mirar dominios.md).
Pasando esa dirección a cualquier persona podrá llegar a nuestro servidor.

Nuestro servidor será intraceable.

Podemos montar un hidden service en una máquina que no tiene ip publica.

Configuración para publicar nuestro servidor web en la red de tor:
HiddenServiceDir /var/lib/tor/loquequieras/
HiddenServicePort 80 127.0.0.1:80

Ejemplos:
HiddenServicePort 22 127.0.0.1:22
HiddenServicePort 21 127.0.0.1:21

