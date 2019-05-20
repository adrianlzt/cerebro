Cuantos threads arrancar? Uno por cpu?


# Testear
haproxy -c -f config


# Esquema
Se puede usar un directorio con las configuraciones repartidas en distintos ficheros.
Una recomendación es poner un "defaults" con los tcp servers debajo y otro "defaults" para los http, así evitamos mezclar opciones tcp<->http

A los backends se les suele llamar "be_XXX" y a los frontend "fe_XXX".

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
20000 concurrent saturated connections per GB of RAM (33kB/conex con el default tune.bufsize, mirar troubleshooting.md)
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
Por defecto 2000

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

### maxconn
Podemos definir aquí de nuevo maxconn (<= que el global) para los frontends que sigan en la config.
Por defecto 2000

### bind
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#bind
Podemos dejar bind sin IP, para que escuche en todas.
También podemos pasar los puertos como un rango (80-90) o una lista (80,81,82). CUIDADO no usar rangos con multiprocess: https://cbonte.github.io/haproxy-dconv/2.0/management.html#11
Si ponemos "ssl" será para que haproxy haga el offloading.

https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.1-crt
El .pem puede ser un concat de certificado, cas y key. También se puede poner el .dh (Diffie-Hellman)
Si ponemos un directorio, se leeran los ficheros en orden alfabético (excepto '.issuer', '.ocsp' or '.sctl')
O podemos poner varios crt: crt certificado crt clave

### http-request redirect
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#http-request%20(Alphabetically%20sorted%20keywords%20reference)
Hacer un http redirect
http-request redirect scheme https unless { ssl_fc }
  redirect de http a https

### use_backend / ACL
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#4.2-use_backend
Que backend usar.

Podemos usar ACLs para definir que usará este backend
https://www.haproxy.com/blog/introduction-to-haproxy-acls/

default_backend
sera el fallback si no se hace match en ningún "use_backend"



## backend
Grupo de servidores que serviran para un servicio.

Ejemplo:
backend web_servers
    balance roundrobin
    cookie SERVERUSED insert indirect nocache
    option httpchk HEAD /
    default-server check maxconn 20
    server server1 10.0.1.3:80 cookie server1
    server server2 10.0.1.4:80 cookie server2

### balance
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#balance
Como seleccionar el server a usar: roundrobin, leastconn, seleccionar por uri, http hedear, etc.
"leastconn", cuidado con que en algún momento todas las conex puedan apuntar al mismo server.
Si tenemos persistencia, solo se usará para la primera conex.
"balance random", respeta pesos, cambios en los pesos dinámicos toman efecto inmediatamente, también agregaciones de nuevos servers. Muy Útil cuando tenemos muchos servers y estos se añaden y elminan con frecuencia.

### cookie
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#cookie%20%28Alphabetically%20sorted%20keywords%20reference%29
Definir una cookie HTTP (SERVERUSED, definido en la línea) en el cliente para tener persistencia (todas las peticiones que se enruten al mismo server)

El nombre del server que se pondrá en la cookie está en la línea "server" (server ... cookie server 1)

### option httpchk
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#option%20httpchk
Envia peticiones HTTP a "/" para comprobar si están los servers vivios.
Por defecto envía HTTP OPTION y espera 2xx o 3xx.
Customizable con http-check
Tenemos que poner "check" en el default-server, o en cada server, para que aplique este "health check"

### default-server
Opciones generales para todos los servers
Generalmente pondremos "check" para que se chequeen los servers con http.
También tenemos que poner, obligatoriamente, maxconn (aquí con en cada server). Será el número máximo de conex que se podrá enviar a cada server.
Empezaremos con algún valor supuesto y luego iremos ajustando. Esto evitará saturar a los servers.


### server
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#server
Los servidores a donde se enviarán las peticiones.
Si usamos un DNS, se resolverá al inicio, o si añadimos "resolvers", se actualizarán durante la ejecución.
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#5.2-resolvers


## listen
Es una forma de declarar un frontend+backend en una sola sección.
Mejor no usar. Puede ser un lío cuando empezemos a meter más opciones.
Ejemplo:
listen stats
    bind *:8404
    stats enable
    stats uri /monitor
    stats refresh 5s



# Reload
Los cambios de config en principio no afectan a las conexiones existentes
https://www.haproxy.com/blog/truly-seamless-reloads-with-haproxy-no-more-hacks/




# Configuración dinámica
No parece que esta función sea un "first-class citizen" de HAproxy.
Para añadir frontend/backends tendremos que modificar la config y hacer reload (reload no tiene impacto, ni se cierra las conex activas)


## server-template
https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#server-template
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

https://www.haproxy.com/documentation/hapee/1-8r1/onepage/intro/#3.5
Podemos sacar un estimador aproximado de que haproxy tenga num_cpus/3 threads o procesos.

Según comentario en https://www.haproxy.com/blog/the-four-essential-sections-of-an-haproxy-configuration/
Los procesos son más eficientes que los threads y deberán usarse siempre que no tengamos algúna de las limitaciones que imponen. En ese caso usaremos threads.
En la version 1.9 han mejorado un 60% la performance del modo threading, por lo que esto puede que ya no sea cierto.

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

CUIDADO! no usar con port ranges: https://cbonte.github.io/haproxy-dconv/2.0/management.html#11

Si estamos modificando maps via la API, tendremos que hacerlo en cada socket de cada proceso (no necesario con multithreading).



# Variables de entorno
Podemos usar variables de entorno en la configuración. Las pondremo como "${NOMBRE}" (comillas incluídas):

  global
      log "${LOGGER}:514" local0
  frontend public
      bind "${LISTEN}:80"

También podemos usarlas para poner las passwords.
