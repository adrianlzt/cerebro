Podemos usar "Match" para usar esa entrada si hace "match" con algo.

Ejemplo haciendo "fallback" hacia otros servidores si no son ciertas las condiciones.
La idea es chequear si estamos en tal red con un ping al router y otro ping para saber si está disponible la IP a la que queremeos conectar
192.168.1.254 sería el router.

  Match host arco exec "sh -c 'ping -W 0.2 -c 1 192.168.1.254 && ping -W 0.2 -c 1 192.168.1.48'"
    Host 192.168.1.4
  Match host arco exec "ping -W 0.2 -c 1 192.168.1.254"
    Hostname 192.168.1.3
  Match host arco exec "nc -vz foo.bar 33501"
    Hostname foo.bar
    Port 33501
  Match host arco
    Hostname foo.bar
    Port 33500

En este artículo usa un script para chequear si la IP que contesta es el server ssh que buscamos.
https://awbmilne.github.io/blog/SSH-Host-Fallback/
