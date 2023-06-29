mirar también https://pyscript.net/

https://reflex.dev/
https://github.com/reflex-dev/reflex
Renombrado de pynecone a reflex.

pip install reflex
rx init?

https://pynecone.io/
https://pynecone.io/docs/getting-started/installation
https://news.ycombinator.com/item?id=35136827

Crear apps web sin JS, todo python.

pip install pynecone
pc init
  instala bun en ~/.bun
pc run
  por debajo usa "bun" (drop-in replacement for Node.js) y "next" para arrancar la app
  FastAPI para el backend
  frontend :3000
  backend :8000

Si queremos cambiar el puerto y modo debug:
pc run --port 8099 --backend-port 9099 --loglevel debug
Si cambio el puerto parece que no configura bien el websocket y no hace eventos.

En modo debug veremos los mensajes pasados por el websocket.

Según vamos editando my_app_name/my_app_name.py vamos viendo en tiempo real el resultado.


# Conceptos
Usa el mismo "component" que React.
Aquí cada función de python es un component que parametrizamos con kwargs.


# Componentes
## pc.hstack
Para organizar cosas horizontalmente.

## wrap react components
https://pynecone.io/docs/advanced-guide/wrapping-react

Ejemplo de oauth con un component de react
https://github.com/pynecone-io/pynecone/issues/395#issuecomment-1510766586


# Eventos

## debounce
Parece que están trabajando en ello
https://www.reddit.com/r/opensource/comments/z7az66/comment/iy5y2b2/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button



# Estado
Definimos variables de la clase "State" (que pasaremos al pc.App).
Podemos modificarlas con la función "set_NOMBREVAR", que se genera automáticamente. Podemos hacer override si queremos.



# Docker
https://github.com/pynecone-io/pynecone/tree/main/docker-example



# Ejemplos
https://pynecone.io/docs/gallery

## Ejemplo app web transcribe audio with OpenAI whipser
https://github.com/romanpeters/whisper-api-ui

Podemos crear una función que funcione como una var:
@pc.var
def upper_text(self) -> str:
    return self.text.upper()



# Internals

## Comunicación frontend - backend
Se hace via websockets.

Ejemplo del frontend enviando datos al backend:
42/event,["event","{\"name\":\"state.hydrate\",\"token\":\"5b7d7082-6b55-4d0b-a34b-ef6433e7bf34\",\"router_data\":{\"pathname\":\"/\",\"query\":{}}}"]

## Código react
Se genera en .web/

Podemos modificarlo a mano para hacer pruebas y ver si se está generando lo que queremos.


# Errores
## next not found
Al ejecutar "pc run" me daba un error de que no encontraba "next".
Borre ~/.bun he hice init y run de nuevo.

## Problemas con el backend
Parece que no funcionar cambiar el puerto del backend (server ws).
Usar siempre 8000.
