Crear un bot:
<https://telegram.me/botfather>

Aqui con /newbot podremos crear un bot nuevo.

# Obtener info bot

curl -s -XPOST <https://api.telegram.org/bot><TOKEN_BOT>/getMe | jq .

# Definir webhook

<https://core.telegram.org/bots/api#setwebhook>

curl -s -XPOST <https://api.telegram.org/bot><TOKEN_BOT>/setWebhook -H 'Content-type: application/json' -d '{"url":"<https://a094f517.ngrok.io"}>' | jq .

Un ejemplo de lo que nos puede enviar telegram está en:
webhook.example

Para enviar mensajes a un canal o a una persona.
El MY_CHANNEL_NAME sería el id de la persona o el canal.
<https://api.telegram.org/bot[BOT_API_KEY]/sendMessage?chat_id=[MY_CHANNEL_NAME]&text=[MY_MESSAGE_TEXT>]

Parece el channel name es <https://web.telegram.org/#/im?p=g382900926>
el parámetro p cambiando la g por un -

O añadir al bot @getidsbot, que al entrar en un canal te dice el id del canal.

Si no, enviar el mensaje al bot: "/my_id @nombrebot" (tras haberlo metido en el canal)
Y mirar los mensajes que recibe el bot:
curl <https://api.telegram.org/botXXX:YYYY/getUpdates>

Visto en:
<https://stackoverflow.com/a/38388851>

# Features

<https://core.telegram.org/bots/features>

## Comandos del bot

Para mostrar los comandos que tiene el bot en el menu de telegram y como autocompletado, usar <https://core.telegram.org/bots/api#setmycommands>

## Grupos

<https://core.telegram.org/bots/features#bot-management>

Si queremos que el bot pueda leer todos los mensajes de un grupo tenemos dos opciones:

- Añadir el bot al grupo y darle permisos de administrador.
- Quitar el modo privacidad (con el @BotFather) y reañadir el bot al grupo.

# Python

<https://docs.python-telegram-bot.org/>
