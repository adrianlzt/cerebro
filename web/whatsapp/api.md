PHP
https://github.com/mgp25/Chat-API

Python
https://github.com/tgalal/yowsup/
https://github.com/tax/pywhatsapp

pip install yowsup2
pip install pywhatsapp

yowsup2 no funciona el registro desde Enero 2019: https://github.com/tgalal/yowsup/issues/2829


# Registrar
http://www.watools.es/pwd.html
  me ha llegado el sms, pero luego me dice que mi número esta bloqueado

O con el cli:
https://en.wikipedia.org/wiki/Mobile_country_code
Mirar para obtener el mcc y mnc

yowsup-cli registration --requestcode sms --phone 34XXXXXXXX --cc 34 --mcc 123 --mnc 456
  Me dice que old_version
yowsup-cli registration --register 123456 --phone 34XXXXXXXX --cc 34

# Ejemplo
git clone https://github.com/tgalal/yowsup.git
cd yowsup



# ADB
https://stackoverflow.com/questions/40509107/send-an-image-with-whatsapp-using-adb-commands

Podemos usar ADB para enviar texto a la app de whatsapp y luego simular que pulsamos el botón de envío:

adb shell "am start -a android.intent.action.SEND -t  text/plain -e jid 346xxxxxxxx@s.whatsapp.net -p com.whatsapp --es android.intent.extra.TEXT pseudo\ api\ usando\ adb && input tap 1333 2450"

La posición del botón dependerá de la resolución de la pantalla.
Podamos usar las dev tools de android para mostrar donde pulsamos y así ver en que coordenadas está el botón.

Hace falta que el teléfono esté desbloqueado. Si no, tendremos que ejecutar otras acciones para desbloquearlo.



# Whatsapp web
Parece que hay varias empresas que lo que hacen es usar whatsapp web para enviar mensajes y montan una api encima.
Si lo entiendo bien, ellos generan un QR que tienes que escanearlo con un móvil personal. Ese movil será quien envíe los mensajes en última instancia.

https://watsapi.com/
http://chapi.me/
https://wassenger.com

Twilio tiene algo, pero parece que aún en beta:
https://www.twilio.com/docs/sms/whatsapp/quickstart/curl

Mirando el inspect del navegador, usa websockets para enviar/recibir mensajes, estados, etc.
Al enviar un mensaje envía datos binarios.
