http://haproxy.1wt.eu/

HAProxy is a free, very fast and reliable solution offering high availability, load balancing, and proxying for TCP and HTTP-based applications.

Interfaz web para consultar el estado: http://demo.1wt.eu/

HAProxy sirve para balancear carga entre varios backends.
Ejemplo sencillo: http://www.cloudadmins.org/2013/04/alta-disponibilidad-en-la-capa-de-balanceo-con-haproxy-y-keepalived/
Dos instancias de haproxy corren en activo-pasivo. Estas instancias redirigen el tráfico http y https a dos backend.

Permite balancear http, websocket, etc

SSL: http://blog.haproxy.com/haproxy/haproxy-and-ssl/


Monitorización: http://blog.scoutapp.com/articles/2011/10/21/monitoring-haproxy


https://github.com/Wizcorp/frontrunner
There are a few tools cropping up recently that aim to make configuration of load balancers more dynamic. Frontrunner works with Marathon and Mesos only, but it’s an interesting way of configuring haproxy.


Podemos correr haproxy en la misma máquina.
Lo ponemos a escuchar en la ip pública y a balancear entre las ips internas.

# Escuchar en un puerto determinado
listen heat_cloudwatch
  bind 172.16.0.11:8003 
  bind 192.168.122.10:8003 
  server overcloud-controller-0 172.16.0.12:8003 check fall 5 inter 2000 rise 2
  server overcloud-controller-1 172.16.0.15:8003 check fall 5 inter 2000 rise 2
  server overcloud-controller-2 172.16.0.13:8003 check fall 5 inter 2000 rise 2

