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
