Una vez tenemos una aplicación desarrollada la ejecutaremos (al menos para desarrollo) con "dapr run".

Ejemplo:
dapr run --app-id mynode --app-port 3000 --port 3500 node app.js

Esto ejecutará "node app.js" y dapr esperará hasta que el "app-port" (3000 en este caso) se levante.
A partir de ese momento, la comunicación con la aplicación node, para usar dapr, se deberá realizar por el puerto HTTP/3500 o gRPC/xxx (nos asignará uno dinámicamente).

Se encapsulará la aplicación dentro de una api de dapr.
La aplicación node que exponga algo en /foo, será accesible, via dapr, en localhost:3500/v1.0/invoke/NOMBREAPP/method/foo
Se puede seguir accediendo directamente a la app node, en este caso en el puerto 3000.

La app hace uso de la api que le provee dapr para almacenar y comunicarse.
Mirar api.md


dapr run COMANDO --app-port 5000
  arranca con un nombre random
  puertos de acceso http y grpc random
  si no ponemos el puerto de la app, al intentar llamar a "invoke" devolverá el error "app channel not initialized"
  tras arrancar la app, le hará dos GET:
    /dapr/config: ToDo
    /dapr/subscribe: para saber a que topics PubSub quiere estar suscrito
