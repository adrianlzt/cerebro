Para esto tendremos que decir al server de tor que no escuche en un proxy socks.

Tendremos que configurar nuestro dns para que las direcciones .onion las resuelva el server de tor. Al servidor le decimos que todas las direcciones .onion las traduzca en un rango de nuestra elección, por ejemplo 10.100.0.0/16
Y crear una regla en el router, para que todas las ips 10.100.0.0/16 las envie al servidor de tor. En el servidor de tor pondremos una regla iptables para redirigir todo el tráfico (origen 0.0.0.0/0 y destino 0.0.0.0/0, salvo la propia ip del server, para poder acceder) al puerto abierto por tor.

De esta manera, cuando en nuestro pc accedamos a una dirección: asdodhada.onion, esta será resuelta por la ip, por ejemplo, 10.100.4.3.
Tendremos una regla de rutas que hará que esa ip nos rediriga a nuestro servidor tor, por ejemplo, 192.168.1.23 (también podriamos meter esta regla de rutas en nuestro router).
El servidor tor cogerá el paquete, lo encapsulará son SSL y lo enviará a un servidor tor publico.
Este paquete dará unos cuantos saltos, y llegará a su dirección .onion destino.

Otra opción es que el paquete quiera salir a internet, por lo que saldrá por un servidor aleatorio de tor con conexión a internet.


Reglas iptables y rutas necesarias:
