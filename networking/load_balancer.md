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


## Comparativas

https://github.com/observing/balancerbattle


HAProxy is a superior load balancer to nginx. HAProxy can do out-of-band health checks, whereas nginx only knows a backend to be "down" when it serves a 500. Also, HAProxy is a general TCP load balancer, whereas nginx will work only on HTTP traffic.
Others in this thread say that nginx does "complicated tasks" better, but chances are, if you're doing a "complicated task" in your load balancer, you've made a mistake somewhere in your application design.
