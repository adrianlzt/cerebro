https://api.ai
de google

wit.ai es lo mismo, pero de facebook
/home/adrian/adrianRepo/ia/api.ai.md 

Luis, de microsoft
https://www.microsoft.com/cognitive-services/en-us/language-understanding-intelligent-service-luis

Otra opcion que parece similar:
http://kitt.ai

Esta pensado para integrarse con google assistant, slack, telegram, kik, facebook messenger

Se usa para generar conversaciones tipo que podemos tener con los usuarios.
Cada frase se matchea con un "intent".
De las frases también podemos extraer parámetros (entities) (play songs for madonna, madonna será el parámetro que buscamos).

Orientado a las conversaciones, también podemos tener contextos. Si estamos reproduciendo música, dentro de ese contexto podremos tener un intent para cambiar de canción (con frase como "next song"), pero ese intent no se disparará en otras ocasiones.


# Entities
https://docs.api.ai/docs/concept-entities

Son los parámetros de las funciones.
Hay bastantes predefinidos por api.ai

Si queremos cualquier cosa tenemos el "any".

Podemos crear nuestros propios entities. Le pasaremos una lista de palabras que serán aceptadas (cada palabra puede tener varios aliases, varias formas de llamar a lo mismo)

Si queremos pillar un parametro tal cual (por si menten puntos etc)
https://docs.api.ai/docs/concept-actions#section-extracting-original-value
Lo que hacemos es crear otro parametro tipo "nombreOriginal" y en value le ponemos $nombre.original

https://docs.api.ai/docs/profile-bot-example-agent#section-cards
En las respuestas podemos enviar un texto, una card, imagen o quick reply.
Las card pueden tener botones, por ejemplo mostrar una receta y poner si quiere buscar otra u obtener más info.
Las quick replies muestran un texto y unos botones con lo que típicamente querría escribir el usuario: Si o No, por ejemplo



# Intents
Default welcome intent: este intent es el que primero recibe a los usuarios. Debe enviar un mensaje para dejar claro al usuario que ahora está en conversación con nuestro bot
Pueden darse distinta prioridad a los intents (pulsando sobre la bolita de color al lado de su nombre).

## Cancel
Si escribimos "cancelar" o "cancel" (en inglés) podemos terminar un dialogo

## Fallback
Intents que se ejecutan si no se matchea ningún otro. Podemos definir varios, por ejemplo para distintos contextos.

## Events
Los intents pueden ser disparados por determinados eventos, por ejemplo WELCOME, que es cuando el usuario entra en nuestra conversación, o GOOGLE_ASSISTANT_WELCOME, que es cuando llega por primera vez desde el google assistant.
Con la integración de google assistant le diremos cual es el default intent que debe usar.

## Actions
Un intent puede ejecutar una acción. Estas acciones pueden requerir parámetros.
Los valores de estos parámetros pueden venir de la frase del usuario.
Si algúno de los parámetros no lo tiene y esta puesto como requisito, se preguntará con el "prompts" asociado a ese parámetro para obtener ese parámetro que falta para ejecutar la acción.

Una acción típica será terminar la conversación.


# Domains
Contestar a preguntas genéricas: el tiempo, traducir, buscar en maps (creo que todos salvo small talk son de pago)

## Small Talk
The Small Talk domain is enabled by default. It answers basic "hi", and "how are you" types of questions from your users. Sometimes these are not expected, so you may consider turning off the Small Talk Domain to avoid any interference with intent handling.


# Contexts
https://docs.api.ai/docs/concept-contexts

Un intent puede definir un contexto de salida. Esto se utiliza para que una frase determinada pueda usarse con distintos sigficados depende de lo que haya dicho el usuario antes.
"Apaga la luz" puede significar distintas luces, con el contexto podremos saber a cual se refiere.

La idea es, en un intent, tras ejecutar una acción, dejamos definido un contexto.
Luego abrá ciertos intents que solo podrán ser usados si cierto contexto está activo.
Es una manera de filtrar que posibles intents se deben usar.

Al usar contextos de entrada, podremos utililizar sus variables (entities)
#context_name.parameter_name


Si un intent tiene un contexto de entrada quiere decir que solo se ejecutará si ese contexto está definido.
Los intents que no tengan contextos de entrada intentarán matchear cualquier texto de entrada, aunque lleve contexto.

Parece que los contexts no obligan a nada.
Ejemplo, todos los intents con contexto "uno", salvo otro que tiene contexto "dos".
Si pasamos una petición con contexto "dos", no quiere decir que obligatoriamente se vaya a ejecutar el que tiene ese contexto. Se hace más caso a que la frase matchee.


Al definir un contexto, recordar presionar enter para que se aplique. Por defecto le pondrá un lifespan de 5 (durante las siguientes 5 preguntas estará disponible, o durante 10 minutos)

Si usamos un sdk podemos generar contextos a mano.
Cuando se lo pasemos al servidor, el nos lo devolverá con el lifespan-1 para cada elemento.



# Limites
https://developers.google.com/actions/develop/apiai/agents-and-actions#configuration_limits



# Integraciones

Comunicación via chats externos:
google assistant, facebook messenger, slack, twitter, skype, telegram, etc

Podemos integrar de dos formas distintas con servicios externos propios:
 - Desde un servicio nuestro enviar el mensaje del usuario a api.ai y recibir lo que le tenemos que decir (ejemplo, skype).
     Lenguages para este tipo de comunicación: android, python, webkit html5, javascript, cordova, etc

 - O que un intent llame a un webservice para obtener la respuesta (ejemplo, consultar el tiempo en una api externa).


## Skype
Integrar con Skype

Crearemos un bot en el bot framework de microsoft y le pasaremos la app id y password a api.ai
Api.ai nos dará el webhook que poner en el botframework.
Cuando llegue un mensaje a skype, microsoft se lo envia al webhook, este pregunta a api.ai.
Api.ai genera una respuesta y el bot se lo devuelve al usuario de skype.

El bot (https://github.com/api-ai/apiai-skype-bot) lo podemos alojar nosotros.

Por tanto sería:
user skype -> microsoft -> nuestro bot -> api.ai
api.ai -> nuestro bot -> microsoft -> user skype


Para arrancar el bot, instalar las deps y configurar las variables de entorno:
APIAI_ACCESS_TOKEN disponible en console.api.ai, al lado del nombre de nuestro agente, pulsando sobre el eje
APIAI_LANG lenguaje: es, en, de, etc
APP_ID id de la app del boy de skype (botframework)
APP_SECRET password del bot de skype

Ejemplo:
APIAI_ACCESS_TOKEN=d7fdce49c4f9e07e1f9e6 APIAI_LANG=es APP_ID=70e88-e21-4d-fa-14491c APP_SECRET=N4Orks82qc3 node app.js

Esto levantará un socket en el puerto 5000, que tendremos que configurar en el botframework.
Ejemplo de endpoint corriendo en local con ngrok:
https://ca42a500.ngrok.io/chat


## Google assistant
Asignaremos una palabra, o varias, código que será como le digamos al asistente de google que queremos hablar con nuestro bot:
Para hablar con el podremos llamarle:
"Let me talk to XXX"
"Talk to XXX"
"At XXX" (este no me suele funcionar, porque no pilla el "At")

Mirar programacion/google/apps/assistant.md


## Facebook Messenger
https://docs.api.ai/docs/facebook-integratio://docs.api.ai/docs/facebook-integration

Tenemos que crearnos una cuenta en https://developers.facebook.com
Tambien tendremos que tener una página en fb para nuestro boot para conseguir el token.

Cosas que podemos devolver al user:
https://developers.facebook.com/docs/messenger-platform/send-api-reference


Mensaje con quick replies
{"message":"prueba con cosas", "target": "xxxxxxxxxxx", "data":{"quick_replies":[{"content_type":"text","title":"Red","payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"}]}}

Mensaje con adjunto (un mp3):
{"message":"prueba con cosas", "target": "xxxxxxxxxx", "data":{"attachment":{ "type":"audio", "payload":{ "url":"http://www.noiseaddicts.com/samples_1w72b820/4929.mp3" } }}}

Adjunto imagen:
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{ "type":"image", "payload":{ "url":"https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg" } }}}

Video adjunto:
{"message":"prueba con cosas", "target": "xxxxxxxxxx", "data":{"attachment":{ "type":"video", "payload":{ "url":"http://techslides.com/demos/sample-videos/small.mp4" } }}}


Card (titulo, subtitulo, texto y botones):
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Welcome to Peters Hats",
            "item_url":"https://petersfancybrownhats.com",
            "image_url":"https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg",
            "subtitle":"Weve got the right hat for everyone.",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },
              {
                "type":"postback",
                "title":"Start Chatting",
                "payload":"que temperatura hace en casa?"
              }              
            ]
          }
        ]
      }
    }}}


Botones:
{"message":"prueba con cosas", "target": "xxxxxxxxx", "data":{"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
}}



## Node js
var apiai = require("apiai");
var app = apiai("ACCESS_TOKEN");
var request = app.textRequest('Hello', {sessionId: '34534534'});
request.on('response', function(response) {console.log(response);});
request.on('error', function(error) {console.log(error);});
request.end();

Pasar contexto:
var request = app.textRequest('mostrar wo', {sessionId: '34534534a', contexts: [{name:"jugando_con_numeros", parameters: {numero: 33}, lifespan: 1}]});


## Webhooks
https://docs.api.ai/docs/webhook#webhook-example
Podemos hacer que para determinandos intents, su action sea llamar a un webservice que será quien aporte la respuesta

Ejemplo en python: https://github.com/api-ai/apiai-weather-webhook-sample


# Machine Learning settings
https://docs.api.ai/docs/concept-agents#section-ml-settings
