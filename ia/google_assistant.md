# Simulador
https://developers.google.com/actions/tools/web-simulator

Las acciones que podemos probar en el web simulator tambien las tengo disponibles en el google assistant del movil.


# Como llamar a custom actions
https://developers.google.com/actions/develop/apiai/invocation-and-discovery

Invocation name: "talk to Personal Chef", "let me talk to Personal Chef"
Deep link invocation: "talk to Personal Chef to find chicken recipes"


# Crear acciones
https://developers.google.com/actions/
https://developers.google.com/actions/develop/apiai/tutorials/getting-started

Para crear "conversations" podemos usar dos métodos:
  Actions SDK (https://developers.google.com/actions/develop/sdk/getting-started)
    Montamos un server que reciba las peticiones de google y conteste

  API.AI
    Nos da una UI para crear un bot conversacional. Desde la propia web podemos integrarnos con google actions para usar el google assistant.


## Llamar a la action
Una vez definamos nuestras palabras clave, "Alexa" por ejemplo, podemos llamarlo de estas maneras:
"Let me talk to Alexa"
"Talk to Alexa"
"At Alexa" (este no me suele funcionar, porque no pilla el "At")

Si queremos que ejecute un intent directamente:
"Talk to Alexa to xxx"
"At Alexa xxx"


## Acciones privadas
Parece que no se permite, al menos por ahora, tener actions privadas.
Tenemos un modo preview que se activa una media hora. Podemos externderlo a 24h en la web del Simulador (https://developers.google.com/actions/tools/web-simulator), pulsando sobre "ACTION PACKAGE"

Parece que hay un truco para activar al modo preview para siempre.
http://stackoverflow.com/questions/41088596/make-google-actions-development-project-preview-persist-longer/41205026#41205026

Tenemos que capturar la respuesta cuando se llama a https://console.api.ai/api/agent/googleassistant/preview cuando estamos activando el modo preview en api.ai, lo guardamos como action.json
Luego nos bajamos esta util: https://dl.google.com/gactions/updates/bin/linux/amd64/gactions/gactions
Y ejecutamos
gactions preview --action_package action.json --preview_mins 9999999 --invocation_name "Alexa"


# Crear comandos
Con IFTTT podemos crear comandos custom para nosotros.
En "then" elegimos "Google Assistant" y en "that" podemos usar "Maker" para enviarnos peticiones HTTP a nuestro servidor



# Beep tras decir "OK Google"
https://productforums.google.com/forum/#!topic/websearch/Pd9MN2XUDzY/discussion

Parece que por ahora la única solución es activar la accesibilidad
https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.voiceaccess
Pero parece que pone iconos por toda la pantalla.




# SDK
https://developers.google.com/assistant/sdk/
https://github.com/googlesamples/assistant-sdk-python

Antes tenemos que activar la API en algun proyecto de google cloud: https://rootear.com/windows/google-assistant-windows-linux-o-macos
pip install google-assistant-sdk[samples]

python -m googlesamples.assistant.auth_helpers --client-secrets client_secret_XXXX.json


