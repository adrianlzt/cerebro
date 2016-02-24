Protocolo publish-subscribe sobre TCP.

Pensando para M2M e IoT.
Un cliente establece un socket contra un servidor y se encarga de mantener el socket abierto a base de "pings".
El cliente puede publicar mensajes en el servidor.
También se puede subscribir a canales y el servidor se encargará de enviar estos mensajes al cliente, sin necesidad de que el cliente haga pooling.

Es un protocolo muy ligero.

En un ejemplo:
208bytes cada 60 segundos para matener el canal (ping request -> ping response -> tcp ack)

Parece que el canal "$SYS" lo tienen todos los servers y es por donde envían información de su estado.


# Client
pip install paho-mqtt

## Cliente gráfico
https://github.com/kamilfb/mqtt-spy/releases



# Server
yaourt -S mosquitto-hg

/usr/bin/mosquitto



Servidor gratuito de prueba:
http://test.mosquitto.org/

Abrir subscriptor:
mosquitto_sub -h test.mosquitto.org -t "pepito/" -v

Enviar mensaje con publicador:
mosquitto_pub -h test.mosquitto.org -t "pepito/" -m "mensaje"

Con ssl:
mosquitto_pub -h m20.cloudmqtt.com -u USUARIO -P PASSWORD -p 28517 -t "otro/" -m "prueba de mensaje" --cafile /etc/ssl/certs/ca-certificates.crt

