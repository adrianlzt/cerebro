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
  consultar json en el cerebro (redis):
  redis-cli GET "hubot:storage" | sed 's#\"#"#g' | jq
Mejor este para almacenar la info en redis: https://www.npmjs.com/package/hubot-brain-redis-hash

Borrar algo del brain: https://github.com/computerminds/cm-hubot/blob/master/scripts/storage-delete.coffee
storage delete <key>


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
https://github.com/github/hubot/blob/master/docs/scripting.md
https://github.com/github/hubot/blob/master/docs/scripting.md#creating-a-script-package

Crear un modulo npm con un script de hubot:
npm install yo generator-hubot
mkdir miscript; cd miscript
../node_modules/yo/lib/cli.js hubot:script
  rellenar los datos adecuados
  en el name no poner "hubot-xxx", el ya pondrá lo de hubot delante


Funciones a implementar
robot.respond: es cuando se llama al bot con "hubot XXX"
robot.hear: es cuando se escribe algo sin pasar el nombre del bot especificamente


## Testing
https://github.com/github/hubot/blob/master/docs/scripting.md#testing-hubot-scripts


# Debug
NODE_DEBUG=module bin/hubot --name .
  para ver donde va a buscar los módulos


# Errores
Si tememos un modulo npm como link no carga correctamente el resto
https://github.com/github/hubot/issues/804

Arreglo:
NODE_PATH=$NODE_PATH:./node_modules bin/hubot --name .

