http://haproxy.1wt.eu/

HAProxy is a free, very fast and reliable solution offering high availability, load balancing, and proxying for TCP and HTTP-based applications.

Interfaz web para consultar el estado: http://demo.1wt.eu/

HAProxy sirve para balancear carga entre varios backends.
Ejemplo sencillo: http://www.cloudadmins.org/2013/04/alta-disponibilidad-en-la-capa-de-balanceo-con-haproxy-y-keepalived/
Dos instancias de haproxy corren en activo-pasivo. Estas instancias redirigen el tráfico http y https a dos backend.

Permite balancear http, websocket, etc




https://github.com/Wizcorp/frontrunner
There are a few tools cropping up recently that aim to make configuration of load balancers more dynamic. Frontrunner works with Marathon and Mesos only, but it’s an interesting way of configuring haproxy.

