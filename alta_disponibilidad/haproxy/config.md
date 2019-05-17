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

Algunos valores interesantes

### timeout connect / timeout client / timeout server
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#timeout%20connect
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#4-timeout%20client
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#timeout%20server

timeout connect 10s  # tiempo que esperamos para conectar con un backend
timeout client 30s   # tiempo que puede pasar mientras el cliente nos enviá datos
timeout server 30s   # tiempo que puede pasar mientras un backend nos enviá datos


### log
Configuramos los frontend que sigan para que usen el logger definido en "global"
log global


### mode
Si queremos un proxy nivel TCP o HTTP (inspecciona el http, pero será más lento)
mode tcp
mode http

### maxconn
Podemos definir aquí de nuevo maxconn (<= que el global) para los frontends que sigan en la config.

### option httplog
Aumentamos el logging de los frontend incluyendo más información útil. Recomendable activarlo.
Si se encuentra un frontend tcp, se cambiará automáticamente a "option tcplog".


## Frontend
Definimos las ips:puertos donde vamos a escuhar a los clientes.
Crearemos tantos frontends como sea necesario.

Ejemplo:
frontend www.mysite.com
    bind 10.0.0.3:80
    bind 10.0.0.3:443 ssl crt /etc/ssl/certs/mysite.pem
    http-request redirect scheme https unless { ssl_fc }
    use_backend api_servers if { path_beg /api/ }
    default_backend web_servers

### bind
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#bind
Podemos dejar bind sin IP, para que escuche en todas.
También podemos pasar los puertos como un rango (80-90) o una lista (80,81,82)
Si ponemos "ssl" será para que haproxy haga el offloading.

https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.1-crt
El .pem puede ser un concat de certificado, cas y key. También se puede poner el .dh (Diffie-Hellman)
Si ponemos un directorio, se leeran los ficheros en orden alfabético (excepto '.issuer', '.ocsp' or '.sctl')
O podemos poner varios crt: crt certificado crt clave

### http-request redirect
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#http-request%20(Alphabetically%20sorted%20keywords%20reference)
Hacer un http redirect
http-request redirect scheme https unless { ssl_fc }<Paste>
  redirect de http a https


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
