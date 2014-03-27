https://vividcortex.com/blog/2013/10/14/what-should-i-monitor/

http://word.bitly.com/post/74839060954/ten-things-to-monitor
  Fork rate (creación de procesos por segundo)
  Swap-in/out rate 
    es más importante ver el número de páginas que se están swapeando por minuto que el tamaño total de swap; un gran swap estático puede no empeorar el performance
  Server boot notification (avisar si el servidor se ha reiniciado). 
    Hacer checkeando el uptime de la máquina, si es menor de 1h avisar (dejar margen para que se ejecute el check)
    El check debería quedarse en estado CRITICAL hasta que lo quitemos nosotros. No tiene que tener reintentos.
  ntp: ntpd running. clock skew inside datacenter. clock skew against external source
  DNS resolution: funciona correctamente la resolución de DNS interna. Queries/s ?
  SSL expiration: chequear los certificados ssl y avisar cuando vayan a caducar
  File descriptors
  Chequear lo mismo que chequea el load balancer para saber si un nodo está activo
  Apache/Nginx error logs
  Service restarts
  NUMA stats

