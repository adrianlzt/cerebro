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

Algo parecido al artículo, pero sin script y chequeando contra la lista de known_hosts que ya tenemos
Lo que hacemos es mirar si la clave que devuelve la IP 1.2.3.4 (que es donde queremos conectar), tiene alguna clave ssh pública que ya conocemos.
En ese caso damos por hecho que es el server donde queremos conectar.
Match host arco exec "sh -c 'timeout 0.3 ssh-keyscan 1.2.3.4 2> /dev/null | xargs -I{} grep -e {} %d/.ssh/known_hosts | grep .'"
  Hostname 1.2.3.4
