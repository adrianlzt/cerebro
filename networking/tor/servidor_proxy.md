Es el formato más básico para entrar en la red Tor.

El servidor abre un puerto con un proxy SOCKS5. Nosotros configuramos nuestro navegador a ese proxy y ya podemos navegar por direcciónes .onion (el proxy de tor hará la resolución), y por internet de manera anónima.


Puerto por defecto:
9050

curl con proxy socks5:
curl --proxy socks5://localhost:9050 sdfouhafhiosdadfas.onion
