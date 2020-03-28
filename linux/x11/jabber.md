# Cliente
dino

Conectará al puerto 5222 del server.
Al comienzo en texto plano, luego intentará cambiar a tls

## Rooms
Tendran el formato:
nombre@conference.mi.dominio.com

Búscador de salas públicas
https://search.jabber.network/rooms/1


# Server
https://github.com/t13a/helm-chart-ejabberd

https://hub.docker.com/r/ejabberd/ecs/

Config en jabberlzt.duckdns.org
Por defecto solo nos meterá el domain "localhost".
Tenemos que editar el fichero para tener más (cargarlo como un ConfigMap)

5222: This is the default XMPP port for clients.
5280: This is the port for admin interface, API, Websockets and XMPP BOSH.
5443: admin interface https
5269: Optional. This is the port for XMPP federation. Only needed if you want to communicate with users on other servers.

## Admin
http://localhost:5280/admin
interfaz administrativa
Crear user admin desde el container (admin@localhost está marcado como admin en la config):
bin/ejabberdctl register admin localhost somepass

Desde la interfaz admin podemos crear users para los distintos dominios (pero no nuevos dominios)


## TLS
Configurar un redir del puerto 80 al 5280 y poner nuesto email en la sección ACME de la config para tener certs let's encrypt

https://docs.ejabberd.im/admin/configuration/#acme

/home/ejabberd/conf/cacert.pem
/home/ejabberd/conf/server.pem


## Status
bin/ejabberdctl status

