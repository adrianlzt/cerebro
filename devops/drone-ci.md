drone.io

Herramienta de CI simple usando docker para el build.

En un fichero .drone.yml le definimos las pipelines.
Cada pipeline es una imagen con las instrucciones que se lanzarán (arranca un container y lanza todas las intrucciones seguidas)

drone modifica siempre el entrypoint para ejecutar /bin/sh para ejecutar los comandos que le pasas.


Tambien puedes levantar "services" para soportar tests. Por ejemplo, levantar un container de postgresql necesario para los tests.


Plugins: github.com/drone/drone-plugin-index
Para usar git por ejemplo.


Tiene un plugin con gogs (repo de git). Automáticamente genera webhooks en gogs apuntando en drone para repo nuevo al que tengamos acceso.
Podremos configurar cuando drone actuará ante un webhook.
  Gated: solo el propietario del repo dispara que se haga el trabajo. Una PR externa no haría nada.
  Timeout: tiempo total para realizar todo el trabajo

Tambien tiene badges

Tiene una sección de secrets donde almacenar clave=valor.
Para poder meter claves en el drone.yml
Se puede limitar que tipos de hooks tienen acceso al los secretos.


# Estructura

## Parte web
Container de docker que sirve la web

## Workers
Containers de docker con acceso al docker.sock para arrancar containers, etc
A estos les pasaremos como variable de entorno donde esta el DRONE_SERVER y el DRONE_SECRET
