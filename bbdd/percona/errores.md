percona3.err
Hora 23:44
La desconecte (ifconfig eth1 down), y al volverla a conectar se cerro el servidor mysql.
Configurar para que autoarranque

percona3.err.bis
Hora 23:53
Tras el fallo anterior, reinicio mysql, vuelve a cascar y se queda apagado.
Las dos arrancadas (.1 y .2) contestan a SHOW STATUS LIKE 'wsrep_local_state_comment';
| wsrep_local_state_comment | Initialized |
Los logs muestran que intentan conectar a .3, pero entre ellas no se hacen caso.

Apago todas, intento arracar percona1, y casca. :(


Puede ser que el problema sea el firewall, que no deja comunicarse al puerto 4568 para IST



Como hacer para borrar estos mensajes de error (se apuntan a ellos mismos)
130209  0:23:42 [Note] WSREP: (dc8051a3-7244-11e2-0800-c2fb67437e1a, 'tcp://0.0.0.0:4567') address 'tcp://10.0.0.3:4567' pointing to uuid dc8051a3-7244-11e2-0800-c2fb67437e1a is blacklisted, skipping



Otro error que me ha dado mientras hacia perrerias
130209  0:24:50 [Note] WSREP: You have configured 'rsync' state snapshot transfer method which cannot be performed on a running server. Wsrep provider won't be able to fall back to it if other means of state transfer are unavailable. In that case you will need to restart the server.



Como monitorizar que el cluster esta en buen estado? http://www.codership.com/wiki/doku.php?id=monitoring
Antes se ha quedado percona1 con mysql encendido pero en estado:
mysql> SHOW STATUS LIKE 'wsrep_local_state_comment';
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    12
Current database: test

+---------------------------+----------------+
| Variable_name             | Value          |
+---------------------------+----------------+
| wsrep_local_state_comment | Donor/Desynced |




ERROR 1047 (08S01): Unknown command
Lo da cuando la base no tiene mayoria (si detecta que se queda aislada). No se puede particionar.



Si un server se apaga, y al iniciarse no tiene conexión, mysql intentará arrancar, y al no enontrar el cluster, se cerrará.



La herramienta clustercheck no funciona.
HTTP/1.1 503 Service Unavailable
Content-Type: text/plain

Percona XtraDB Cluster Node is not synced.




Si se apagan los 3 nodos, al arrancar no funciona el cluster. Problema de como iniciar el grupo.



Si apago 2 de los nodos, ya no se vuelve a recuperar el cluster.
El que quedaba saca todo el rato el mismo mensaje:
130209  1:05:49 [Note] WSREP: (a3f441cc-724b-11e2-0800-35c26ea126bf, 'tcp://0.0.0.0:4567') reconnecting to 2dbae7d2-724c-11e2-0800-56fb0219dc1f (tcp://10.0.0.1:4567), attempt 60

El que volvio a la vida:
130209  1:06:33 [Note] WSREP: (aea604de-724b-11e2-0800-487d62e25bdd, 'tcp://0.0.0.0:4567') address 'tcp://10.0.0.3:4567' pointing to uuid aea604de-724b-11e2-0800-487d62e25bdd is blacklisted, skipping

Y el tercero no consigue arrancar:
130209  1:04:19 [ERROR] WSREP: failed to open gcomm backend connection: 110: failed to reach primary view: 110 (Connection timed out)
         at gcomm/src/pc.cpp:connect():139
	 130209  1:04:19 [ERROR] WSREP: gcs/src/gcs_core.c:gcs_core_open():195: Failed to open backend connection: -110 (Connection timed out)
	 130209  1:04:19 [ERROR] WSREP: gcs/src/gcs.c:gcs_open():1290: Failed to open channel 'cluster' at 'gcomm://10.0.0.1,10.0.0.2,10.0.0.3': -110 (Connection timed out)



percona3.err.perm_denied
Error arrancando el primer nodo con  /etc/init.d/mysql start --wsrep-cluster-address="gcomm://"
Tambien están quitadas las iptables por si acaso.
No hay nada escuchando previamente en el puerto 4567.
Mismo error si arranco con service mysql start
---> Tenia el SELinux activado


