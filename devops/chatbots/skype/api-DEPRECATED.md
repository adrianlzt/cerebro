# Oficial
https://dev.botframework.com/

Ahí pinchamos en "Register a bot", necesitaremos logearnos con nuestra cuenta de skype.

Al registrar el bot tenemos que pasar el endpoint https donde se nos enviarán las notificaciones.

Podemos montar un bot de ejemplo como los que nos dan en https://github.com/Microsoft/BotBuilder/blob/master/Node/examples/demo-skype/app.js
Con ngrok lo publicamos a internet, y configuramos el endpoint como: <ngrok link>/api/messages

Integración con hubot:
https://www.npmjs.com/package/hubot-skype-bot#getting-started
https://github.com/ClaudeBot/hubot-skype-bot

mirar dev-botframework-nodejs.md

# Nuevo (2016) pero no oficial
https://skpy.t.allofti.me/index.html

# Skype4Py - antiguo
En linux sigue funcionando. En windows creo que ya no funciona o no permite enviar mensajes.

https://gist.github.com/cwacek/3640980
https://github.com/taksan/skype-java-api/


## Modulo para python
https://github.com/awahlig/skype4py#usage
import Skype4Py
skype = Skype4Py.Skype(Transport='x11')
skype.FriendlyName = "Skype Bot"
skype.Attach()
# Aceptarlo en la app x11
chats = skype.Chats
for chat in chats:
  if 'NOMBRE' in chat.Name:
    break
chat.SendMessage("asd")





# Con D-Bus
import time
import gobject
import dbus, sys
import dbus.service
from dbus.mainloop.glib import DBusGMainLoop
def send_dbus_message(message):
  return skype_api_object.Invoke(message)

remote_bus = dbus.SessionBus(mainloop=DBusGMainLoop(set_as_default=True))
skype_api_object = remote_bus.get_object('com.Skype.API', '/com/Skype')
send_dbus_message('NAME SkypeApiPythonTestClient')
send_dbus_message('PROTOCOL 7')
send_dbus_message('SEARCH ACTIVECHATS')
send_dbus_message('SEARCH RECENTCHATS')
send_dbus_message('CHATMESSAGE #adrianlzt/$adrilzt;a37c8246e21b3229 pepe')


# D-Bus cli
dbus-send --session --type=method_call --print-reply --dest=com.Skype.API /com/Skype com.Skype.API.Invoke string:NAME\ hello string:PROTOCOL\ 5 string:SET\ PROFILE\ RICH_MOOD_TEXT\ echo123
No me fona
