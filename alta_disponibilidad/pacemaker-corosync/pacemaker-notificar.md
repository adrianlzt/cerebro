http://floriancrouzat.net/2013/01/monitor-a-pacemaker-cluster-with-ocfpacemakerclustermon-andor-external-agent/

http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/ch07.html

http://linux.die.net/man/7/ocf_heartbeat_clustermon


Depende de nuestro SO, compilación etc puede que tengamos disponible alertar por snmp o email.
En cualquier caso, siempre podremos usar un externa agent.
A este external agent se le pasan los valores mediante variables globales.

Para configurar el recurso:
primitive ClusterMon ocf:pacemaker:ClusterMon \
       params user="root" update="30" extra_options="-E /usr/local/bin/clusterMon.sh" \
       op monitor on-fail="restart" interval="10"

clone ClusterMon-clone ClusterMon \
       meta target-role="Started"

Acordarse de poner el .sh con permisos de ejecucción para el usuario de pacemaker (0755 de forma más genérica)

Guardo fichero de ejemplo en este directorio del repo.
