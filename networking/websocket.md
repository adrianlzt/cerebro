http://www.websocket.org/
http://www.html5rocks.com/es/tutorials/websockets/basics/

Sockets para navegadores web.
Nos permite mantener una conexión TCP abierta con un servidor.

Útil cuando tenemos que estar transmitiendo información contínua a un usuario.
Puede tener mucho sentido unirla con un publish/subscribe

Utiliza WebSocket siempre que necesites una conexión casi a tiempo real y de latencia baja entre el cliente y el servidor. Ten en cuenta que esto podría significar tener que replantearte cómo has desarrollado tus aplicaciones de servidor, adoptando un nuevo enfoque en tecnologías como las colas de eventos. Estos son algunos ejemplos de casos prácticos:
  Juegos online multijugadores
  Aplicaciones de chat
  Rotativos de información deportiva
  Actualizaciones en tiempo real de las actividades de tus amigos


ws:// web socket
wss:// web socket secure


Testear si tenemos websockets en el navegador
http://websocketstest.com/


Con Google chrome, e inspeccionar elemento, podemos ver en la pestaña Network los datos que se envían y reciben (buscar un elemento con código HTTP 101).
Importante, pinchar de nuevo en el GET inicial para recargar los datos, que aparecerán en el tab "Frames".
http://blogdotkaazingdotcom.files.wordpress.com/2012/05/screen-shot-2012-05-08-at-3-40-54-pm.png

También podemos analizar el tráfico websocket con wireshark y el filtro "websocket".


Un ejemplo básico de .html que usa websocket mediante javascript lo podemos encontrar en:
http://www.websocket.org/echo.html

Hace uso de eventos para funcionar: onopen(), onmessage(), onerror()...


Ejemplos: http://www.websocket.org/demos.html


Implementaciones en distintos lenguajes:

Node.js
  Socket.IO: http://socket.io/
  WebSocket-Node: https://github.com/Worlize/WebSocket-Node
  ws: https://github.com/einaros/ws

Java
  Jetty: http://www.eclipse.org/jetty/

Ruby
  EventMachine: http://github.com/igrigorik/em-websocket

Python
  pywebsocket: http://code.google.com/p/pywebsocket/
  Tornado: https://github.com/facebook/tornado
