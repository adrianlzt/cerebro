Charla ducksboard:
Cuando necesitamos poner RabbitMQ en cluster podemos tener muchos problemas, sobre todo si tenemos network split.


http://everythingshouldbevirtual.com/ansible-rabbitmq-cluster


La conexión a un cluster de rabbitmq debe gestionarse con un round robin de dns, un balanceador TCP o un pacemaker.

De RabbitMQ:
Generally, it's not advisable to bake in node hostnames or IP addresses into client applications: this introduces inflexibility and will require client applications to be edited, recompiled and redeployed should the configuration of the cluster change or the number of nodes in the cluster change. Instead, we recommend a more abstracted approach: this could be a dynamic DNS service which has a very short TTL configuration, or a plain TCP load balancer, or some sort of mobile IP achieved with pacemaker or similar technologies. In general, this aspect of managing the connection to nodes within a cluster is beyond the scope of RabbitMQ itself, and we recommend the use of other technologies designed specifically to solve these problems.
