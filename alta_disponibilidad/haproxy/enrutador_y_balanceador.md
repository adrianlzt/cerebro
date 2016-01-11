frontend http
acl app1 path_end -i /app1/123 #matches path ending with "/app/123"
acl app2 path_end -i /app2/123 
acl app3 path_end -i /app3/123 


use_backend srvs_app1    if app1
use_backend srvs_app2    if app2
use_backend srvs_app3    if app3

backend srvs_app1 #backend that lists your servers. Use a balancing algorithm as per your need.
   balance roundrobin 
   server host1 REGION1_HOST_FOR_APP1:PORT 
   server host2 REGION2_HOST_FOR_APP1:PORT

backend srvs_app2
   balance roundrobin
   server host1 REGION1_HOST_FOR_APP2:PORT 
   server host2 REGION2_HOST_FOR_APP2:PORT

backend srvs_app3
   balance roundrobin
   server host1 REGION1_HOST_FOR_APP3:PORT 
   server host2 REGION2_HOST_FOR_APP3:PORT


# Balanceando un redis
Se escucha en 192.168.1.3:6379 y se balancea entre los nodos 4, 5 o 6.
Para chequear si el nodo se da por bueno se envia la cadena "info replication" y se espera "role:master"
Esto parece que es para solo enviar el tráfico al master. 

listen redis
  bind 192.168.1.3:6379 
  balance first
  option tcp-check
  tcp-check send info\ replication\r\n
  tcp-check expect string role:master
  timeout client 0
  timeout server 0
  server prod-00 192.168.1.4:6379 check fall 5 inter 2000 rise 2
  server prod-01 192.168.1.6:6379 check fall 5 inter 2000 rise 2
  server prod-02 192.168.1.5:6379 check fall 5 inter 2000 rise 2

