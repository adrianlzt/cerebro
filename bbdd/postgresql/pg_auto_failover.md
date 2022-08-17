https://pg-auto-failover.readthedocs.io/en/master/
https://github.com/citusdata/pg_auto_failover

Extensión que se encarga de hacer el promote de un nodo standby en caso de caída del master.
Parece simple y sencillo para la tarea.

Necesita un tercer nodo que hace de monitor y es un SPOF.
https://pg-auto-failover.readthedocs.io/en/master/faq.html#consequences-of-the-monitor-being-unavailable
https://github.com/citusdata/pg_auto_failover/issues/867
Parece que no dan una solución clara (más que tenerlo en algún sistema que se encargue de que esté arriba, k8s por ejemplo).

# Install
## Ubuntu
apt install -y postgresql-14-auto-failover pg-auto-failover-cli


# Arquitectura
https://pg-auto-failover.readthedocs.io/en/master/intro.html

## Single standby
Tendremos un nodo primario, un standby (replicando) y un tercer nodo como monitor (un postgres con esta extensión, pero no será una réplica)
