http://www.dioty.co/
App android: https://play.google.com/store/apps/details?id=co.dioty.app654321

Server mqtt con app para android.
La idea es que nuestros dispositivos iot envien los datos a este broker y poder ver los datos desde la app de android

You may send up to 50000 messages per month for free


Nos da una app android bonita para poder mostrar el contenido de un topic.
También podemos poner otros botones (slider o switch) que al cambiarlos envian el dato a un topic.


Just for your interest: there's no magic to it, the app stores its configuration on DIoTY's MQTT broker under the topic /<userid>/DIoTY/config  (so for you this is: /user@email.com/DIoTY/config).  As long as you have this, the next time the app starts it can get its configuration back.
