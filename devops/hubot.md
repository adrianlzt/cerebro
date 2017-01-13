https://hubot.github.com/docs/
https://github.com/github/hubot/blob/master/src/

Bot para meter en distintos chats.
Integración con: skype, slack, etc

Los scripts se hacen en coffee o binarios (con el modulo shellcmd)

# Instalación
Necesitamos nodejs y npm

sudo npm install -g yo generator-hubot
npm install -g yo generator-hubot
mkdir myhubot
cd myhubot
yo hubot
  nos hace unas preguntas para configurar el owner, nombre del bot, descripcion y adaptador
  Para usar skype poner skype-bot en el adaptador

Probar (arranca por defecto con el adapter shell):
bin/hubot
myhubot> myhubot ping
myhubot> PONG

# Uso
Suele ser comodo arrancar el bot como:
bin/hubot -a ADAPTADOR

Por ejemplo, para skype:
bin/hubot -a skype-bot

MICROSOFT_APP_PASSWORD="XXXXXXXXX" MICROSOFT_APP_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" bin/hubot -a skype-bot

Si queremos que la interfaz http arranque en otro puerto (por defecto 8080):
PORT=8081 hubot


Para recargar el bot y que lea nuevos scripts coffee:
myhubot reload

## Adaptadores
Podemos configurar un adaptador para recibir los mensajes via ese servicio: skype, slack, etc

hubot -a skype-bot


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

hubot-conversation
https://github.com/lmarkus/hubot-conversation
Para hacer conversaciones con los usuarios

## Externos
https://github.com/coderofsalvation/hubot-script-shellcmd
  Se le puede cambiar el nombre para ejecutar el modulo con la var HUBOT_SHELLCMD_KEYWORD
  HUBOT_SHELLCMD_KEYWORD=exec hubot -l .
  Asi usaremos: .exec script

  Los scripts se guardan en: node_modules/hubot-script-shellcmd/bash/handlers

# Brain
Es donde almacenamos datos para utilizarlos en otro momento.
Si queremos persistencia entre reinicios -> https://github.com/hubot-scripts/hubot-redis-brain


# Commands generales
ADAPTER
ECHO cosa
TIME
PING
help

# Logging
@robot.logger.error "Enviando mensaje a skype #{err}"


# Crear modulos
https://hubot.github.com/docs/scripting/
