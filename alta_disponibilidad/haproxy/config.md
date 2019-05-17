Cuantos threads arrancar? Uno por cpu?


# Testear
haproxy -c -f config


# Esquema
Bloques que forman el fichero de config:
```
global
    # global settings here

defaults
    # defaults here

frontend
    # a frontend that accepts requests from clients

backend
    # servers that fulfill the requests
```

No hace falta identación. Cada sección termina cuando empieza la siguiente.
Identamos para hacer más legible.


## Global

### maxconn
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#maxconn%20(Performance%20tuning)

Algunos estimadores para calcular este valor:
20000 concurrent saturated connections per GB of RAM
8000 concurrent TLS connections (client-side only) per GB of RAM
5000 concurrent end-to-end TLS connections (both sides) per GB of RAM

También hará falta memoria para stick tables, map files, and ACL files


### log
A donde enviar los logs, syslog generalmente.

### user/group
Que user/group usará. Mala práctica correrlo como root.
Haciendo drop de los privilegios parece que evitamos que se puedan leer las tls keys (siempre que estas estén read-only para root solo)

### stats socket
Para poder usar la runtime API
stats socket [<address:port>|<path>] [param*]

Parametros: https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.1
Parece que podríamos proteger el socket con certificados TLS cliente?

### nbproc / nbthread
Para arrancar varios procesos/threads.
Mirar "Multiples CPUs" más abajo.
Con 1 proceso 1 thread haproxy tiene buena performance. Tal vez queremos más si tenemos mucho TLS offloading.

### ssl-default-bind-ciphers
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#3.1-ssl-default-bind-ciphers
Seleccionar los ciphers que permitimos.
Chequear con https://www.ssllabs.com/ssltest/ si la elección es buena en términos de seguridad/compatibilidad.

Opciones de configuración con:
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#3.1-ssl-default-bind-options
ssl-default-bind-options


## Defaults
Valores por defecto que queremos usar.
Podemos definir varias secciones "defaults", que aplicarán a lo que siga en la configuración.
Al encontrarnos otra sección "defaults", se reestableceran los valores a los de por defecto.



# Reload
Los cambios de config en principio no afectan a las conexiones existentes
https://www.haproxy.com/blog/truly-seamless-reloads-with-haproxy-no-more-hacks/




# Configuración dinámica
No parece que esta función sea un "first-class citizen" de HAproxy.

## server-template
Para modificar los backends.
Con una línea precreamos un montón de "servers" de los cuales luego podremos modificar su ip puerto para añadir las IPs que necesitemos.

server-template www 200 10.0.0.1:8080 check

Nos creará servers desde www1 hasta www200, lo que luego podremos modificar con el runtime api.


## dns service discovery
https://www.haproxy.com/blog/dns-service-discovery-haproxy/<Paste>
Usar el resultado de una query DNS SRV (o A) para obtener los backends.

server-template www 200 _http._tcp.red.default.svc.cluster.local:8080 check resolvers kube





# Multiples CPUs
https://www.haproxy.com/blog/multithreading-in-haproxy/

En general lo dejaremos con 1 proceso 1 thread. Tal vez lo querremos incrementar si tenemos mucho TLS offloading.

Si definimos alguno de estos valores seguramente queramos también tocar el "cpu-map" para pinnear los procesos a determinadas CPUs.

De https://www.haproxy.com/documentation/hapee/1-8r1/onepage/intro/#3.5 podemos sacar un estimador aproximado de que haproxy tenga num_cpus/3 threads o procesos.

## Multithreading
Un único proceso con varios threads.
Algo menos performante que multiprocess (blog multithreading, dec'17)
Soluciona algunos problemas (mirar Multithreading en https://www.haproxy.com/blog/whats-new-haproxy-1-8/)
Esta es la mejor opción si empezamos con haproxy y no tenemos requisitos muy estrictos de performance.

Config:
global
  nbthread N


## Multiprocess / Master-worker
Podemos arrancar varios procesos (nbproc) de haproxy.
Con el modo master-worker, tendremos un proceso padre y el resto serán hijos.

Arrancar haproxy con -W, o en la config:
global
 master-worker

Config para número de procesos:
global
  nbproc N
