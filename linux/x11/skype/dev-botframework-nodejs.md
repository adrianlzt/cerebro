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

