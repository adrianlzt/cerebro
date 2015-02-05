Waiting for quorum... Timed-out waiting for cluster
[FAILED]

Comprobar que los puertos UDP 5404 y 5405 están abiertos.
El script de init.d va a esperar a que el resto de nodos arranquen, así que debemos hacerlos todos más o menos simultáneamente.





Mensajes repetitivos de:
corosync [TOTEM ] Retransmit List: xxx xxx ...

El cluster no se puede parar (solo con kill -9).
Se ha quedado "tonto", no tiene la misma vista en los nodos, ni se levantan los servicios.

https://access.redhat.com/solutions/38510
https://access.redhat.com/solutions/784373
https://access.redhat.com/solutions/342213
Mirar en priv

Si estamos sobre kvm (podria ser openstack), actualizar a 6.6 kernel kernel-2.6.32-504.el6
vale kernel-2.6.32-431.23.1.el6 en centos 6.5?

Usar udpu (mirar unicast.md)
