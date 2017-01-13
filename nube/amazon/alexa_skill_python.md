https://developer.amazon.com/blogs/post/Tx14R0IYYGH3SKT/Flask-Ask-A-New-Python-Framework-for-Rapid-Alexa-Skills-Kit-Development
https://alexatutorial.com/flask-ask/

pip install flask-ask


Crearemos un web service sobre flask que contestará a las peticiones recibidas por amazon.

Definiremos un @ask.lauch que será cuando se inicie la llamada a nuestro skill

Luego definiremos varios @ask.intent("cosa") que será como debe contestar nuestro skill cuando amazon nos pregunte por ese intent.
El mapeo entre lo que dice un usuario y los intents lo hacemos al declarar el skill en la "store".

@launch y los @intent deben retorna un question(mensaje).
Este mensaje puede ser tan simple como un texto, que alexa reproducirá para el usuario.

También podemos usar la variable "session" para almacenar datos para usarlos después (estos "attributes" se enviarán hacia alexa, que nos los devolverá en las posteriores llamadas)


Si contestamos con "question" es que no damos por finalizada la sessión y lo siguiente que conteste el usuario irá para nuestro skill.
Si se contesta con statement se da por terminada la interacción.
