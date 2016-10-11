https://developers.google.com/drive/v3/web/push
https://pushnotificationsplayground.appspot.com/
  web que nos permite crear las notificaciones
  codigo disponible en github

1.- Verificar que el dominio donde se van a enviar las notificaciones es nuestro:
https://www.google.com/webmasters/tools/home?hl=es

1.1.- el procedimiento típico es subir un fichero que te pasan. Complicado con GAE
1.2.- Añadir una etiqueta html en la web de inicio


2.- Registrar el dominio en google api
https://console.developers.google.com/apis/credentials/domainverification

Meter las URLs que se pueden configurar en "URIs de redireccionamiento autorizados"
Puede tardar un poco en funcionar.


3.- Hacer la petición para registrar el push (channel).
Podemos ayudarnos de: https://developers.google.com/drive/v3/reference/files/watch#try-it
El id lo generamos con uuidgen

Ejemplo del POST que se genera
POST https://www.googleapis.com/drive/v3/files/1RFkMhtJMEs_2b8ahPnql4MlAYm5X_TykZPPKoLOaoZc/watch?fields=address%2Cexpiration%2Cid%2Ckind%2Cparams%2Cpayload%2CresourceId%2CresourceUri%2Ctoken%2Ctype&key={YOUR_API_KEY}
{
 "id": "bf740351-ea49-45e0-b2f3-583702f76a91",
 "type": "web_hook",
 "address": "https://pepe-2016.appspot.com/notify"
}

Con python:
https://github.com/googledrive/pushnotifications-playground/blob/master/push.py


Parece que aunque le pongamos que queremos el registro por mucho tiempo, solo nos lo da 24h.
Supongo que habrá que andar reregistrando el push cada 24h
