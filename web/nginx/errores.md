http://serverfault.com/questions/640976/nginx-ulimit-worker-connections-exceed-open-file-resource-limit-1024
worker_connections exceed open file resource limit: 1024

Aumentar el numero de openfiles
nginx.conf
 worker_rlimit_nofile 65535;

Podemos comprobarlo con
cat /proc/PID/limits | grep open
mirar uno de los nginx worker, no el nginx master


413 Request entity too large
http://www.cyberciti.biz/faq/linux-unix-bsd-nginx-413-request-entity-too-large/
nginx:
client_max_body_size 5M;

