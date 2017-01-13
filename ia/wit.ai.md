https://wit.ai/
de facebook

api.ai es lo mismo pero de google



Natural Language for Developers

Reconocimiento de lenguaje natural a funciones con parámetros.

Se crean stories, que es cada ejemplo que enseñamos al bot de lo que puede introducir un usuario.

Si queremos definir campos custom, lo seleccionamos con el ratón, elegimos que tipo dato, y le asignamos un rol (pulsando en el redondelito)

Viejo:
Se definen "intents" (propositos) y se enseña a witai como se les va a llamar y pasar los parámetros.
El nos devuelve el nombre del intent detectado con los parámetros.



# API

# HTTP
https://wit.ai/docs/http/20141022#authentication-link

curl -H 'Authorization: Bearer $TOKEN' 'https://api.wit.ai/message?v=20160526&q=hello'

curl -G -d 'v=20160526' -H "Authorization: Bearer $TOKEN" 'https://api.wit.ai/message'  --data-urlencode 'q=texto con espacio'

## Python
python/wit.py


## Node.js
https://github.com/wit-ai/node-wit
npm install --save node-wit

ejemplo:
const {Wit, log} = require('node-wit');
