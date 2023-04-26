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


# Estado
Definimos variables de la clase "State" (que pasaremos al pc.App).
Podemos modificarlas con la función "set_NOMBREVAR", que se genera automáticamente. Podemos hacer override si queremos.


# Errores
## next not found
Al ejecutar "pc run" me daba un error de que no encontraba "next".
Borre ~/.bun he hice init y run de nuevo.


# Ejemplo app web transcribe audio with OpenAI whipser
https://github.com/romanpeters/whisper-api-ui
