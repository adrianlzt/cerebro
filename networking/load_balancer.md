http://www.zenloadbalancer.org

http://haproxy.1wt.eu/

http://httpd.apache.org/docs/2.2/mod/mod_proxy_balancer.html

haproxy.md
nginx.md
hipcache.md


Si se usa HTTPS el handshake lo lleva a cargo el LB, y este ya transmite la información no codificada hacia los servidores.
Si no fuese así, los servidores tendrían carga extra por el procesado SSL. 
Tampoco se podría tener sticky session, porque el LB no puede leer las peticiones.


Existen dos tipos comunes de LB:
  capa 4 - trasporte: solo encaminamiento de paquetes
    cisco pix (hardware)

  capa 7 - aplicación: lee cabeceras, puede modificar, puede hacer de proxy http, etc
    zeus, muy bueno (hardware) http://www.layer47.com/zeus_load_balancer.html
    f5 (hardware)

    Ej.: vienen peticiones SQL, si son tipo INSERT,UPDATE,DELETE lo envío al master, si es un SELECT, al master y al slave.


## Persistencia
Si tenemos multitud de clientes realizando conexiones pequeñas contra el balanceador de forma muy seguida, puede que el LB se quede sin puertos para conectar contra el pool de servidores.
En el caso HTTP podemos usar keepalive / http1.1 / http reuse para que el LB mantena el "tubo" abierto con cada uno de los servidores del pool.

## Comparativas

https://github.com/observing/balancerbattle


HAProxy is a superior load balancer to nginx. HAProxy can do out-of-band health checks, whereas nginx only knows a backend to be "down" when it serves a 500. Also, HAProxy is a general TCP load balancer, whereas nginx will work only on HTTP traffic.
Others in this thread say that nginx does "complicated tasks" better, but chances are, if you're doing a "complicated task" in your load balancer, you've made a mistake somewhere in your application design.


# Arquitecturas

## VIP
Un balanceador configurado en una VIP. Este balanceador reenvia el tráfico a los nodos activos
Problema, si se cae el balanceador nos quedamos sin servicio.

## Activo-Activo
Los registros DNS apuntan a varios nodos simultáneamente. Cada uno de estos nodos a su vez balancea internamente (mirar haproxy.md)
Problema, si se cae uno de los nodos se perderán esas peticiones? Al menos 1 de cada 3 que vayan contra esa ip.



# DSR / Direct Server Return
https://kemptechnologies.com/white-papers/what-is-direct-server-return/

El balanceador pasa la petición al servidor y el servidor contesta directamente al cliente (sin pasar por el LB)

No es trivial de configurar. Tiene bastantes implicaciones.
