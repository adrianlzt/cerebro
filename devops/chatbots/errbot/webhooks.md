http://errbot.io/en/latest/user_guide/plugin_development/webhooks.html

Debemos tener el webserver activado.

Enviaremos POST a:
baseurl/nombre_webhook

El return contestará a la petición http.


Si hacemos:
curl -XPOST localhost:3141/room/pepe -d "mensaje=123"
En el objeto request tendremos:
{'mensaje': '123'}
