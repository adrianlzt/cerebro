http://wamp-proto.org/

Mejor nchan? Crossbar creo que no escala gratuitamente (es de pago el cluster)

Implementa RPC y Pub-Sub sobre Websockets.

Las librerias que se pueden usar: Autobanh-X
http://crossbar.io/autobahn/

Router para las peticiones: crossbar.io


# Install
[crossbar]
name = Crossbar
baseurl = http://package.crossbar.io/centos/7/
enabled = 1
gpgcheck = 1

yum install -y crossbar


# Server crossbar
Una forma rapida de montar un server de crossbar con docker
https://github.com/crossbario/crossbar-examples/tree/master/docker/disclose

## TLS/SSL
https://crossbar.io/docs/Secure-WebSocket-and-HTTPS/


# Python
Cliente websocket basico con Autobahn
https://github.com/crossbario/autobahn-python/tree/master/examples/asyncio/websocket/echo


## Cliente WAMP wss
Para probar conexión a un server WAMP con wss podemos usar este ejemplo.
https://github.com/crossbario/autobahn-python/blob/master/examples/asyncio/wamp/pubsub/tls/backend_selfsigned.py

Si queremos no chequear el certificado pondremos:
options = ssl.create_default_context()
options.check_hostname = False
options.verify_mode = ssl.CERT_NONE

El realm usado ("cossbardemo" en este caso) debe existir en el server crossbar


Podemos poner un publicador y un subscriptor con estos ejemplos: https://github.com/crossbario/autobahn-python/tree/master/examples/asyncio/wamp/pubsub/basic
Podemos usar el server demo de crossbar:
wss://demo.crossbar.io/ws (realm: realm1)


### Login
http://crossbar.io/docs/Challenge-Response-Authentication/
from autobahn.wamp import auth



# Errores
2017-04-05T12:28:00 failing WebSocket opening handshake ('WebSocket connection upgrade failed (302 - Found)')
2017-04-05T12:28:00 dropping connection to peer tcp:52.29.77.26:80 with abort=True: WebSocket connection upgrade failed (302 - Found)
Esto parece que es cuando intentamos conectar a un server wss pero usando ws://
