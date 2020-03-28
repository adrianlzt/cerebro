Crear un bot:
https://developers.google.com/hangouts/chat/quickstart/apps-script-bot#step_2_publish_the_bot

Al configurar el bot nos permite:
  endpoint URL
    nos envia mensajes JSON (timeout max 30s)
    deberemos usar un webhook de una sala si queremos enviar mensajes sin que nadie llame al bot
      no podemos enviar cards con actions (a parte de openlink). Al pinchar en los botones no está definido a que bot deben enviarse los mensajes.
    podemos usar "Service accounts" (https://developers.google.com/hangouts/chat/how-tos/service-accounts) para enviar mensajes sin el límite de timeout=30s
      creamos una "service account" en la consola de google y luego usamos esas credenciales para enviar mensajes.
      más libertad que con webhook
      podemos enviar cards con botones que los reciba el bot
  Apps script project
    ejemplos: https://github.com/googlecodelabs/hangouts-chat-apps-script/blob/master/final/Code.gs
  Cloud Pub/Sub
  Dialogflow

Crear un bot usando GCE pub-sub: https://developers.google.com/hangouts/chat/how-tos/pub-sub

API lib python:
http://googleapis.github.io/google-api-python-client/docs/dyn/chat_v1.spaces.html

# Cards
Los links solo pueden ser https
Podemos usar httpbin como redirect

https://httpbin.org/redirect-to?url=http://foo.bar

Si ponemos /cosa?foo=bar&este=no
El parámetro "este" se pasará a redirect-to


# Rooms
## Threads
https://developers.google.com/hangouts/chat/how-tos/bots-develop#thread_key
Cada sala tiene "threads".
Al enviar los mensajes podemos especificar un thread específico para siempre enviar los mensajes al mismo.
Pero parece que las service accounts distintas, aunque envíen al mismo thread, se generan thread distintos.

Thread keys are also scoped to a specific bot; if two different bots happen to both post messages using the same thread key, those two messages will not be grouped into the same thread.
