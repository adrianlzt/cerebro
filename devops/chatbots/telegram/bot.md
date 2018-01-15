Crear un bot:
https://telegram.me/botfather

Aqui con /newbot podremos crear un bot nuevo.


# Obtener info bot
curl -s -XPOST https://api.telegram.org/bot<TOKEN_BOT>/getMe | jq .


# Definir webhook
https://core.telegram.org/bots/api#setwebhook

curl -s -XPOST https://api.telegram.org/bot<TOKEN_BOT>/setWebhook -H 'Content-type: application/json' -d '{"url":"https://a094f517.ngrok.io"}' | jq .


Un ejemplo de lo que nos puede enviar telegram está en:
webhook.example
