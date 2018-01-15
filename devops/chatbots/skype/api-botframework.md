Mirar web.md para api para hablar desde skype.


A partir de Enero 2018 los bots se gestionan desde Azure.
Parece que ya no se puede almacenar datos en el userData del usuario.
https://github.com/Microsoft/BotBuilder/issues/3785#issuecomment-347300980

Existen varias opciones, unas para desplegar el bot en Azure y otra simplemente para registrar un bot externo en azure:
Bot Channels Registration
https://docs.microsoft.com/es-es/bot-framework/bot-service-quickstart-registration
Nos pide tarjeta de débito para poder registrarnos en Azure.
Solo registrar un bot no tiene coste si ponemos la tarifa F0

En "Administracion de bots" -> "Configuración" podemos encontrar el app id y app password (este dando en administrar al lado del app id)

Para que pueda conectar con Skype hace falta publicar el bot. Y esperar que aprueben la review?
Parece que tarda un rato en empezar a enviar los mensajes. He visto como 1h hasta que han empezado a llegar.


https://docs.botframework.com/en-us/skype/chat
Info sobre como funciona
https://blogs.msdn.microsoft.com/tsmatsuz/2016/08/19/build-skype-bot-with-microsoft-bot-framework-oauth-and-rest-api/


Login
curl -XPOST https://login.microsoftonline.com/common/oauth2/v2.0/token -d "client_id=Poner-nuestro-Microsoft-App-ID&client_secret=Poner-nuestro-secreto&grant_type=client_credentials&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default" | jq '.'



Enviar mensaje
curl -XPOST https://apis.skype.com/v3/conversations/ID_DEL_USUARIO/activities -H "Authorization: Bearer EL_TOKEN_OBTENIDO_ANTES" -d '{
"type": "message/text",
"text": "Hi! (wave)"
}'

El id del usuario lo he obtenido viendo una petición de un mensaje que envié al bot.
No se como obtener estos ids de forma generica.

Otra manera:
https://github.com/ShyykoSerhiy/skyweb/issues/16
8:skypeid

Parece que solo funciona si lo tenemos agregado.


# Conocer usuario
No podemos obtener su username https://github.com/Microsoft/BotBuilder/issues/515

La forma de identificarlo unívocamente es con la pareja channelId/Address (aunque para nosotros channelId es siempre skype)

Aunque si podemos enviar mensajes al usuario con 8:skypeid



# Debug
HUBOT_LOG_LEVEL=debug bin/hubot ...
