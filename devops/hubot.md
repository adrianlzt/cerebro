Bot para meter en distintos chats.
Integración con: skype, slack, etc

Los scripts se hacen en coffee o binarios (con el modulo shellcmd)

Suele ser comodo arrancar el bot como:
hubot -l .
De esta manera podemos ejecutar los comandos como:
.comando


Si queremos que la interfaz http arranque en otro puerto (por defecto 8080):
PORT=8081 hubot


Para recargar el bot y que lea nuevos scripts coffee:
.reload

# Modulos
Hubot viene con muchos modulos útiles: https://github.com/github/hubot-scripts/tree/master/src/scripts

Si queremos añadir alguno de estos lo meteremos en:
/opt/hubot/skynet/hubot-scripts.json

Tendremos que mirar las dependencias npm que esten al comienzo del fichero .coffee

## Utiles
cat
Definir la variable HUBOT_CAT_PORT
Atacar puerto udp

http-say
enviar mensajes a un canal mediante http get

http-post-say
para enviar con post
curl -XPOST "http://localhost:8081/hubot/say" -d "message=prueba mensaje" -d 'room=#nombre/$36e8ecdba2f81cc'

## Externos
https://github.com/coderofsalvation/hubot-script-shellcmd
  Se le puede cambiar el nombre para ejecutar el modulo con la var HUBOT_SHELLCMD_KEYWORD
  HUBOT_SHELLCMD_KEYWORD=exec hubot -l .
  Asi usaremos: .exec script

  Los scripts se guardan en: node_modules/hubot-script-shellcmd/bash/handlers


# Crear modulos
https://hubot.github.com/docs/scripting/
