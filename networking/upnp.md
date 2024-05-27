Protocolo para solicitar aperturas de puertos dinámicas.
Mirar nat.md

App para linux:
upnpc

Exportar mi puerto 25/TCP a un puerto generado dinámicamente:
upnpc -r 25 TCP

External port 2222 forwarded to internal port 22
upnpc -e "upnpc test" -a $IP 22 2222 TCP

Delete
upnpc -d 2222 TCP

En unas pruebas con un router casero no autodescubría, pero si funcionaba si le pasaba la URL directamente:
upnpc -u http://192.168.1.1:52869/gatedesc.xml -r 25 TCP
