Por defecto no viene con autenticación.

X-Pack security es una opción, de pago.

Firewall:
  - no exponer :9200 públicamente
  - solo permitir acceso a los servidores que lo necesiten
  - no bloquear puertos 9300 entre los nodos de ES


https://www.elastic.co/blog/playing-http-tricks-nginx
Como poner nginx como reverse proxy.
Está un poco anticuado y hay cosas mal, pero nos sirve como punto de partida.


SSL: usar nginx, haproxy, apache para poner SSL


Una estructura sería read-only cluster y write cluster.
Podemos poner nginx para encaminar las peticiones write al cluster adecuado.

Otra idea es filtrar que IPs pueden hacer peticiones al cluster.

También podemos apuntar kibana a un cluster read-only para evitar que malas queries nos tiren el cluster (solo permitir GET, HEAD, OPTIONS).
