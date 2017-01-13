https://github.com/Microsoft/BotBuilder/tree/master/Node/core
https://docs.botframework.com/en-us/node/builder/guides/core-concepts/

mkdir mibot
cd mibot
npm init
npm install --save restify
npm install --save botbuilder


server.js:
var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
      session.send('Hello World');
      session.send("[prueba](coso)", {style: "markdown"});
});



MICROSOFT_APP_ID="XXX" MICROSOFT_APP_PASSWORD="YYYY" node server.js

Para probarlo:

curl localhost:3978 -H "Content-Type: application/json; charset=utf-8" -H "Authorization: Bearer TOKEN" -d '{
    "type": "ping",
    "id": "7OjlKBZjrOR",
    "timestamp": "0001-01-01T00:00:00",
    "serviceUrl": "https://dev.botframework.com/",
    "channelId": "test",
    "from": {
        "id": "portal"
    },
    "conversation": {
        "id": "ping"
    },
    "recipient": {
        "id": "bot"
    }
}'

# Intents
Si queremos responder a varios comandos podemos hacerlo con intents:

https://docs.botframework.com/en-us/node/builder/guides/core-concepts/#determining-intent

# Address
Es lo que tenemos que almacenar para contestar al usuario.
El id varia entre mismos mensajes en el mismo chat, el resto se mantiene.

# Usuario
El id del usuario lo podemos obtener de session.message.user.id
No podemos obtener su username https://github.com/Microsoft/BotBuilder/issues/515

# results
Si pasamos varias funciones a un dialog, la variable results que se va pasando es un objeto tipo:
{ resumed: 0, response: true, childId: '*:/chat' }

Si usamos builder.Prompts.text en results tendremos la respuesta del usuario.

# Dialogs
Son dialogos que entablamos con el bot.

Cuando entramos en uno no salimos hasta que escribamos la palabra clave que hayamos definido (goodbye por ejemplo). Da igual que reiniciemos el bot.

Si queremos ir pasando por las funciones de un dialog:

        @bot.dialog '/', [
          (session, result, skip) ->
            console.log "Root dialog"
            session.send "root dialog"
            #session.beginDialog('/login')
            skip()
            return
          (session) ->
            console.log "segundo Root dialog"
            session.send "segundo root dialog"
            return
        ]


# Almacenar información
https://docs.botframework.com/en-us/node/builder/guides/core-concepts/#adding-dialogs-and-memory

Hay distintos tipos de sitios donde almacenar info: userData, conversationData, privateConversationData, dialogData.
Para activar conversationData: bot.settings.persistConversationData = true; (bot es lo creado con new UniversalBot)

Guardar:
session.userData.name = results.response;

Consultar:
if (!session.userData.name) {
...

La información se almacena si despues hacemos un session.send o session.beginDialog. Si no, podemos forzar que lo guarde con:
session.save()
https://github.com/Microsoft/BotBuilder/issues/1158
https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.session.html#save


# Enviar que estamos escribiendo
session.sendTyping()


# Cards
https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.herocard.html

Ejemplos:
https://github.com/Microsoft/BotBuilder/blob/master/Node/examples/demo-skype/app.js#L223

Podemos enviar tarjetas, envia un titulo, subtitulo, texto, link e imagen o video.
También se le pueden poner botones, que abren webs o escriben de nuevo en el chat.

Si enviamos un mensaje con varias cards, paraece que acepta como máximo 10.
Con 11 me da este error:
Error: Request to 'https://smba.trafficmanager.net/v3/conversations/29%3A1VZ1kZyZYHBjeLsAMwZ9dygGIjl4AFfagzZ4RIwAwT2c/activities' failed: [400] Bad Request


Solo se pueden poner 5 botones
