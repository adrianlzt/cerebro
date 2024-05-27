Protocolo para solicitar aperturas de puertos dinámicas.
Mirar nat.md

App para linux:
upnpc

External port 2222 forwarded to internal port 22
upnpc -e "upnpc test" -a $IP 22 2222 TCP

Delete
upnpc -d 2222 TCP
