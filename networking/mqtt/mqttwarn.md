https://github.com/jpmens/mqttwarn/
http://jpmens.net/2014/04/03/how-do-your-servers-talk-to-you/

Conector mqtt -> multitud de servicios.
Software que se subscribe a topics de un server mqtt y cuando recibe mensajes pasa el payload a una gran variedad de outputs:
amqp
file
log
mysql
pastebin
postgres
pushbullet
twitter
...

Se configura con un fichero .ini donde configuramos los outputs (TLFs para enviar un sms, servidor de correo, token de pushbullet, etc).
Luego decimos a que topics se debe subscribir, y a quien (y por que medio) avisará en caso de recibir algún mensaje.


