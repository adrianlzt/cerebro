<https://patroni.readthedocs.io/en/latest/>
<https://github.com/patroni-training/2019>
<https://github.com/zalando/patroni>
<https://github.com/zalando/spilo>
<https://www.cybertec-postgresql.com/en/patroni-setting-up-a-highly-available-postgresql-cluster/>
<https://www.cybertec-postgresql.com/es/servicios/replicacion-postgresql/clustering-recuperacion-fallas-postgresql/>
<https://www.opsdash.com/blog/postgres-getting-started-patroni.html>
<https://www.slideshare.net/ZalandoTech/high-availability-postgresql-with-zalando-patroni>
<https://cloud.google.com/architecture/architectures-high-availability-postgresql-clusters-compute-engine#ha_using_the_patroni_template>
  buen resumen de como funciona, con unos esquemas para entenderlo.

Se encarga de hacer el auto-promote de una instancia replica en caso de que caiga la primaria.
Podemos configurar una VIP usando <https://github.com/cybertec-postgresql/vip-manager> (mirar más abajo)

Timescale es el que recomienda.
Viene preinstalado en su imagen "-ha".

Necesita un Distributed Configuration Store (DCS):

- etcd
- consul
- zookeeper
- exhibitor
- kubernetes
- raft

Patroni es el encargado de arrancar postgres.

# Configuracion

<https://patroni.readthedocs.io/en/latest/dynamic_configuration.html>

Puede estar dividida en tres partes, dentro del DCS, fichero de config yaml o variables de entorno.

La configuración que de postgres se ve afectada por lo que definamos en patroni. Existe un orden de prioridad sobre que ficheros o configuraciones toman precedencia sobre otras.

Deberíamos meter todo en DCS y solo cosas particulares de los nodos en la local.

Corriendo un cluster de postgres con patroni: <https://patroni.readthedocs.io/en/latest/README.html#running-configuring>

Ejemplo de config: <https://github.com/zalando/patroni/blob/master/postgres0.yml>

Explicación de cada uno de los parámetros:
<https://patroni.readthedocs.io/en/latest/SETTINGS.html#settings>

Configurar "use_slots", para poder trackear mejor a las réplicas:
<https://patroni.readthedocs.io/en/latest/faq.html#configuration:~:text=on%20Etcd%20v3.6.-,I%20have%20use_slots,-enabled%20in%20my>

# API

<https://patroni.readthedocs.io/en/latest/rest_api.html>

Podemos consultar quien es el master, replica, health, recargar, etc

## Modificar configuración

<https://github.com/zalando/patroni/blob/master/docs/rest_api.rst#config-endpoint>

curl -s -XPATCH -d \
        '{"loop_wait":5,"ttl":20,"postgresql":{"parameters":{"max_connections":"101"}}}' \
        <http://localhost:8008/config> | jq .

patronictl -c /etc/patroni.yml edit-config -p max_connections=101

# patronictl

Ver el estado del cluster y sus miembros:
patronictl -c /etc/patroni.yml list NOMBRECLUSTER

## restart

Supuestamente patronictl restart reinicia los postgres, pero no me funciona.
Se hace la llamada a la API, se para pero no arranca (al menos con la imagen de timescaledb-ha para docker).

## switchover

Si queremos cambiar el primario, en un cluster healthy.

## failover

Si quremos hacer primario a una réplica, en un nodo sin cluster.

# etcd

Almacena la información en /service/$CLUSTER_NAME

Obtener la configuración almacenada:

```bash
docker exec -it etcd etcdctl get /service/zabbix/config | tail -n -1 | jq
```

Histórico:

```bash
docker exec -it etcd etcdctl get /service/zabbix/history | tail -n -1 | jq
```

Initialize:

```bash
docker exec -it etcd etcdctl get /service/zabbix/initialize
```

Status:

```bash
docker exec -it etcd etcdctl get /service/zabbix/status | tail -n -1 | jq
```

Borrar lo almacenado en etcd:

```bash
docker exec -it etcd etcdctl del --prefix /service/zabbix
```

# Internals

Cuando va a proceder a arrancar un cluster, una cosa que hace es obtener el "Database cluster state" para decidir como proceder.
Esto lo hace con (paths de ejemplo):
LC_ALL=C /usr/pgsql-14/bin/pg_controldata -D /var/lib/postgresql/data

Según el estado determinará como debe arrancar.

# Troubleshooting

## Reiniciar nodo

En un nodo replica, podemos parar patroni, borrar el contenido de PGDATA y arrancar de nuevo patroni.
En este caso empezará haciendo un basebackup.

# Errores

## waiting for leader to bootstrap

Si el cluster ya se consiguió inicializar existirá una key /service/$CLUSTER_NAME/initialize, por lo que no se volverá a lanzar un initdb.
Si existe esa clave y hemos borrado ambos nodos del cluster de postgres, el cluster no podrá arrancar.
Tendremos que borrar esa key (etcdctl del /service/batman/initialize) o, mejor, sacar el cluster del DCS:
patronictl -c postgres.yml remove $CLUSTER_NAME

## following a different leader because i am not the healthiest node

Tras una caida del cluster, intento arrancar el que era el follower, pero no me deja, porque está en modo replica y patroni no lo acepta como válido porque no es capaz de arrancar.
Pero no puede arrancar porque no puede conectar con el primario (está caído).

Al final arranqué el nodo que paró más tarde y fue bien.

# vip-manager

<https://www.cybertec-postgresql.com/en/postgresql-clustering-vip-manager/>
<https://github.com/cybertec-postgresql/vip-manager>

Pequeño programa en go que se encarga de setear una VIP en el nodo activo.
Se dedica a pollear la key de etcd para ver quien es el master y añadir (o quitar) esa VIP según sea necesario.
Tiene que estar corriendo en todos los nodos.

## Instalación

<https://github.com/cybertec-postgresql/vip-manager/releases/>
En las releases de github dejan un .rpm y .deb

## Config

Por defecto se mete en y es donde la busca la unit de systemd:
/etc/default/vip-manager.yml

Tendremos que modificar:

- trigger-key: el "namespace" usado en patroni (el nombre donde encontrar la clave, por ejemplo /service/NAMESPACE/leader)
- trigger-value: el nombre de host usado en patroni (el que se seteará en la key "leader", patroni.yaml key "name")
- ip / netmask / interface: la VIP a usar, su netmask y la interfac donde configurarla
- los endpoints de etcd (y credenciales en caso de ser necesario, o comentarlos si no lo usamos; lo mismo con los certs de etcd)

# Switchover / failover

Failover es la configuración de que pasa si falla el leader.

Switchover es para cambiar a mano el leader.

<https://www.dbi-services.com/blog/patroni-operations-switchover-and-failover/>

# Backup / pgbackrest

<https://patroni.readthedocs.io/en/latest/replica_bootstrap.html#building-replicas>
Como integrar patroni y pgbackrest.

## Restaurando a partir de un etcd vacío / bootstraping

<https://patroni.readthedocs.io/en/latest/replica_bootstrap.html#bootstrap>

Si tenemos el etcd sin configuración, patroni hará un bootstrap.

Para que ese bootstrap haga uso de pgbackrest configuraremos lo siguiente.
En este caso haciendo un PITR. pgbackrest ya se encarga de generar el recovery.conf, por lo que lo mantenemos.
Usamos no_params para evitar que patroni pase un par de parámetros extra que no son válidos en pgbackrest:
También usamos el target-action=promote para que postgres se mantenga arrancado al terminar de restaurar, que es lo que espera patroni.
Al usar --delta lo que le estamos diciendo es que hemos dejado PGDATA como estaba y pgbackrest se encargará solo de descargar lo necesario y borrar lo sobrante.

```yaml
bootstrap:
  ...
  method: pgbackrest
  pgbackrest:
    command: /usr/bin/pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=zabbix --log-level-console=info restore --delta --target-action=promote --link-all --set=20250921-063001F_20250924-063001I --type=time --target="2025-09-24 12:00:00 +00"
    no_params: True
    keep_existing_recovery_conf: True
```

Tras hacer esto veo que no está usando la configuración que ha restaurado de postgresql.auto.conf.

Si falla con:

```
FATAL: recovery ended before configured recovery target was reached
```

Puede ser porque no tenemos los WAL necesarios para ir al PITR demandado. Mirar las líneas:

```
LOG: starting point-in-time recovery to 2025-09-24 12:00:00+00
LOG: last completed transaction was at log time 2025-09-24 06:36:44.844297+00
```

Luego restauraremos el nodo 2, tras borrar PGDATA. Hará un pg_basebackup para bajarse una copia.
Creo que es posible configurar patroni para que lo baje del backup en vez del otro nodo, no lo he probado.

## Restaurando con un etcd con la última configuración

Para hacer la restauración tendremos que:
Pararemos el cluster.
Borraremos el PGDATA
Meter esta config extra en patroni (la quitaremos una vez restaurado):

postgresql:
  create_replica_methods:
    - pgbackrest
  pgbackrest:
    command: /usr/bin/pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=NOMBRESTANZA --log-level-console=info restore
    keep_data: True
    no_params: True
    no_master: 1

Arrancaremos solo en el nodo donde hayamos metido esa config.
Una vez esté running y leader, arrancaremos el otro.

Si no se vuelve leader (tal vez vemos el mensaje "My wal position exceeds maximum replication lag"), usaremos "failover" para forzarlo a que se haga primario.
