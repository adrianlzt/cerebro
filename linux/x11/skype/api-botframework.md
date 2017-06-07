Mirar web.md para api para hablar desde skype.


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
