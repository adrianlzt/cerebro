cloudmqtt.com

Parte de AWS

Nos permite levantar instancias de servidores MQTT

Podemos ver los logs del server y sus estadísticas ($SYS)

También tiene una ventana con websocket para que veamos que mensajes se están publicando y poder publicar desde la web. Solo vemos los mensajes que se publican desde que abrimos el websocket.

También nos permite crear usuarios con permisos para leer y/o escribir sobre los topics que definamos.
Con bridges podemos conectar este server mqtt con otro server mqtt.

# Ejemplos
mosquitto_pub -h m20.cloudmqtt.com -u USUARIO -P PASSWORD -p 18517 -t "otro/" -m "prueba de mensaje"

## SSL
mosquitto_pub -h m20.cloudmqtt.com -u USUARIO -P PASSWORD -p 28517 -t "otro/" -m "prueba de mensaje" --cafile /etc/ssl/certs/ca-certificates.crt

