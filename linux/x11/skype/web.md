https://web.skype.com/es/


# Python
Usar la api desde python
https://github.com/OllieTerrance/SkPy
from skpy import Skype
sk = Skype(username, password)
ch = sk.contacts["joe.4"].chat
ch.sendMsg("hola")
ch.getMsgs()

Hablar con un bot:
bot = sk.contacts.bot("xxxxx4269-ac27-8c584ae6a29d")
bot.invite("hola")
chat = bot.chat
chat.sendMsg("hola")

Modo debug
SKPY_DEBUG_HTTP=1 python programa.py

Chats recientes
sk.chats.recent()
Siguientes llamadas nos van devolviendo los más antiguos

Mensaje a un groupchat:
sk.chats.chat("19:42fbdbc82d64cbb70edb68249@thread.skype").sendMsg("hola peep")




# curl
Enviar mensajes con curl

curl 'https://client-s.gateway.messenger.live.com/v1/users/ME/conversations/8:USUARIODESTINO/messages' -H 'RegistrationToken: registrationToken=MITOKEN' --data-binary '{"content":"El texto que queremos enviar","messagetype":"RichText"}'


Escuchar mensajes entrantes:
while true; do curl -s 'https://client-s.gateway.messenger.live.com/v1/users/ME/endpoints/SELF/subscriptions/0/poll' -X POST -H 'Content-Length: 0' -H 'RegistrationToken: registrationToken=MITOKEN' | jq; done
