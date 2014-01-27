http://docs.docker.io/en/latest/use/working_with_links_names/

Corremos una imagen dándole un nombre ('redis'). Dicha imagen tiene que 'exposes' algún puerto, pero no será necesario pasar el parámetro -p para verlo en el host.
En este caso, crosbymichael/redis hace expose del puerto 6379.
docker run -d -name redis crosbymichael/redis

Ahora corremos un segundo container linkándolo al primero:
docker run -t -i -link redis:db -name webapp ubuntu bash
  -t -i bash -> para abrir una shell en el container
  -link, me uno al container "redis" y le asigno internamente el nombre "db".

En este nuevo container, webapp, se definirán automátcamente unas variables de entorno asociadas al container linkado:
DB_NAME=/webapp/db
DB_PORT=tcp://172.17.0.8:6379
DB_PORT_6379_TCP=tcp://172.17.0.8:6379
DB_PORT_6379_TCP_PROTO=tcp
DB_PORT_6379_TCP_ADDR=172.17.0.8
DB_PORT_6379_TCP_PORT=6379


## Seguridad inter-container ##
Si queremos limitar la visibilidad entre contenedores podemos definir el parámetro
-icc=false  
Esto hará que la intercomunicación (icc) entre contenedores quede limitada a los puertos 'exposed' enlazados mediante -link
