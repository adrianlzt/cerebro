Protocolo para descubrir las direcciones MAC de nuestros vecinos.

Enviamos un mensaje NS (Neighbor solicitation) a la dirección multicast: ff02::1:ffaa:bbbb
Donde aabbbb es el final de la dirección por la que estamos preguntando.
Esta dirección se conoce como 'solicited-node multicast' (http://tools.ietf.org/html/rfc4291#section-2.7.1), y solo contestarán aquellos hosts que tengan una ip acabada en aa:bbbb.

A nivel 2, en caso de ser ethernet, la petición multicast se enviará a 33:33:ff:aa:bb:bb, indicando los primeros '33:33' que debe ser broadcasted a todos los nodos.
Podría pensarse en filtrar, y que solo las MAC que terminen en aa:bb:bb aceptasen el paquete, pero sería un error, al poder definirse una dirección ipv6 manualmente que nada tuviese que ver con la MAC.

El vecino solicitado recibirá este paquete y contestará con un NA (Neighbor Advertisement) a la MAC y dirección IP del que originó el NS.

#http://tools.ietf.org/html/rfc4861#section-7.3.2
En la cache de vecinos, cuando sale el paquete NS la entrada está como INCOMPLETE, y tras recibir el NA, pasa a REACHABLE.
Se mantendrá en este estado durante /proc/sys/net/ipv6/neigh/default/base_reachable_time segundos (30 por defecto). Durante este periodo, nuevas peticiones a la misma dirección no necesitarán de este protocolo.

Tras los 30 segundos la entrada pasará a estado STALE.
En este estado no se asegura la alcanzabilidad, y solo se comprobará cuando haya tráfico. Una vez se vea tráfico, se pasa al estado DELAY, y si tras 5 segundos no se comprueba la alcanzabilidiad, se enviará nuevamente un paquete NS.

Tras un tiempo, se borrará la entrada.


En el receptor del NS, tras contestar creará una entrada en estado DELAY.
Este estado espera por si las capas superiores envían más paquetes y se logra la alcanzabilidad, si no, esperará 5 segundos (delay_first_probe_time, creo), y enviará él un NS.
