Red oculta funcionando bajo internet.

Tienes que montar un servidor para acceder a la red Tor y que te resuelva los dominios (xxxxxx.onion).
Para acceder a ese dominio, el servidor tor se conectará a un servidor público de tor, y de ahí irá dando saltos hasta llegar al destino.
El servidor encapsulará nuestro paquete con SSL para que no sea legible.

Con Tor podemos conseguir, también, conectarnos a servidores de internet de manera anónima. Nuestro paquete entrará encapsulado con ssl en un server público de tor, y saldrá por otro servidor en cualquier parte del mundo.
Lo recomendable es navegar con "sesión incógnito" para evitar que un javascript malicioso lea nuestras cookies.

Lo más básico es montar un servidor proxy.
También podemos montar un servidor completo para no tener que usar un proxy.
