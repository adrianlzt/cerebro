https://console.cloud.google.com/iot/registries

# Registro / registru
Device registry is a container of devices with shared properties.

Seleccionaremos a que topic se enviarán (de Google Pub/Sub) los datos de este registro.
projects/NOMBRE_PROYECTO/topics/XXX

Luego tendremos que añadir los devices a ese registry.
Para cada dispositivo tenemos que crear una clave pública y una privada.

openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem

Subiremos la pública a Google Cloud IoT Core para autenticar el dispositivo.
Usaremos la privada en el dispositivo para que se autentique.


# Publicar MQTT
https://cloud.google.com/iot/docs/how-tos/mqtt-bridge

mqtt.googleapis.com:8883

https://cloud.google.com/iot/docs/how-tos/credentials/jwts
Para autenticarnos usaremos como contraseña un JWT con el project id y la clave privada. (snippets para crearlo https://cloud.google.com/iot/docs/how-tos/credentials/jwts)
Esta credencial caduca cada x tiempo.
No podemos definir un JWT que expire en más de 24h: https://cloud.google.com/iot/quotas

Ejemplo con mosquitto
https://gist.github.com/DazWilkin/b59b390100db435309f4c66298a08764

Ejemplo con valores:
LONG_REGISTRY=projects/NOMBRE_PROYECTO/locations/ZONA_GCP/registries/NOMBRE_REGISTRO
DEVICE=nombre_con_el_que_lo_hemos_dado_de_alta
PASSWORD=crear_con_jwt

mosquitto_pub \
--host mqtt.googleapis.com \
--port 8883 \
--id ${LONG_REGISTRY}/devices/${DEVICE} \
--username unused \
--pw ${PASSWORD} \
--tls-version tlsv1.2 \
--protocol-version mqttv311 \
--debug \
--qos 1 \
--topic /devices/${DEVICE}/events \
--message "Hello x"

