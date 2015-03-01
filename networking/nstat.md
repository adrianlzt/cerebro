Información estadística sobre las conexiones del sistema: tcp, ip, udp...

nstat
  muestra los valores y pone a 0 los contadores
  la idea es mostrar los cambios entre las dos ultimas ejecuciones

nstat -s
  no pone a 0 los contadores, así que en la próxima ejecucción vemos el acumulado

nstat -a
  muestra global y resetea contadores (poner -s si no queremos que resetee)

nstat -d <time>
  se queda en modo demonio recogiendo valores cada time segundos. Cuando lo matemos hace un dump a /tmp/.nstat.uIDUSER

nstat -z
  muestra tambien los contadores a cero

nstat -z "*Drop*" "*Backlog*"
  muestra solo los contadores que matcheen esas expresiones

nstat -r
  resetear valores
