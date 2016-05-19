https://wiki.archlinux.org/index.php/tor

Red oculta funcionando bajo internet.

Tienes que montar un servidor para acceder a la red Tor y que te resuelva los dominios (xxxxxx.onion).
Para acceder a ese dominio, el servidor tor se conectará a un servidor público de tor, y de ahí irá dando saltos hasta llegar al destino.
El servidor encapsulará nuestro paquete con SSL para que no sea legible.

Con Tor podemos conseguir, también, conectarnos a servidores de internet de manera anónima. Nuestro paquete entrará encapsulado con ssl en un server público de tor, y saldrá por otro servidor en cualquier parte del mundo.
Lo recomendable es navegar con "sesión incógnito" para evitar que un javascript malicioso lea nuestras cookies.

Lo más básico es montar un servidor proxy.
También podemos montar un servidor completo para no tener que usar un proxy.


Si queremos solo un navegador mirar: navegador.md

Si queremos montar un proxy socks:
yaourt -S tor
systemctl start tor
Levanta el puerto 9050

Para usar cualquier programa mediante tor:
torsocks PROGRAMA

Ejemplo:
torsocks curl eth0.me


# Relay
Para ser parte de la red tor
Para montar un relay: http://blog.cinan.sk/2013/12/02/join-the-deep-web-as-a-tor-relay

Cuidado con ser un nodo de salida a internet, la gente puede estar usando nuestra ip para cosas ilegales.
