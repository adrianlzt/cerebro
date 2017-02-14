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
pacman -S mosquitto
pip install paho-mqtt

## Cliente gráfico
https://github.com/kamilfb/mqtt-spy/releases
  java -jar mqtt*.jar
  no me funciona
  Error: no se ha encontrado o cargado la clase principal pl.baczkowicz.mqttspy.Main



# Server
yaourt -S mosquitto-hg
apt install mosquitto

Mirar que sea la version 1.4 en adelante, si no, mirar repos testing o similar

/usr/bin/mosquitto



Servidor gratuito de prueba:
http://test.mosquitto.org/

Abrir subscriptor:
mosquitto_sub -h test.mosquitto.org -t "pepito/" -v
  Podemos usar el caracter "#" para subscribirnos a todo, o a todo debajo de un path "casa/#"

Enviar mensaje con publicador:
mosquitto_pub -h test.mosquitto.org -t "pepito/" -m "mensaje"

Con ssl:
mosquitto_pub -h m20.cloudmqtt.com -u USUARIO -P PASSWORD -p 28517 -t "otro/" -m "prueba de mensaje" --cafile /etc/ssl/certs/ca-certificates.crt



# Poner auth
http://www.steves-internet-guide.com/mqtt-username-password-example/

Parecido a como hace auth basic apache.

Crear fichero de passwd:
mosquitto_passwd -c passwd adrianlzt


/etc/mosquitto/conf.d/auth.conf:
allow_anonymous false
password_file /etc/mosquitto/passwd



# SSL
https://primalcortex.wordpress.com/2016/03/31/mqtt-mosquitto-broker-with-ssltls-transport-security/

Generar los certificados con https://github.com/owntracks/tools/blob/master/TLS/generate-CA.sh

/etc/mosquitto/conf.d/ssl.conf
listener 8883
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/HOSTNAME.crt
keyfile /etc/mosquitto/certs/HOSTNAME.key


Ejemplo con ssl + auth:
mosquitto_sub -h 192.168.1.100 -p 8883 -t "pepito/" -u miuser -P mipass -v --cafile ca.crt
mosquitto_pub -h 192.168.1.100 -p 8883 -t "pepito/" --cafile ca.crt -m "ppp" -u miuser -P mipass
