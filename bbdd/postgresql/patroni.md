https://patroni.readthedocs.io/en/latest/
https://github.com/patroni-training/2019
https://github.com/zalando/patroni
https://github.com/zalando/spilo
https://www.cybertec-postgresql.com/en/patroni-setting-up-a-highly-available-postgresql-cluster/
https://www.cybertec-postgresql.com/es/servicios/replicacion-postgresql/clustering-recuperacion-fallas-postgresql/
https://www.opsdash.com/blog/postgres-getting-started-patroni.html
https://www.slideshare.net/ZalandoTech/high-availability-postgresql-with-zalando-patroni

Se encarga de hacer el auto-promote de una instancia replica en caso de que caiga la primaria.
Podemos configurar una VIP usando https://github.com/cybertec-postgresql/vip-manager (mirar más abajo)

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
https://patroni.readthedocs.io/en/latest/dynamic_configuration.html

Puede estar dividida en tres partes, dentro del DCS, fichero de config yaml o variables de entorno.

La configuración que de postgres se ve afectada por lo que definamos en patroni. Existe un orden de prioridad sobre que ficheros o configuraciones toman precedencia sobre otras.

Corriendo un cluster de postgres con patroni: https://patroni.readthedocs.io/en/latest/README.html#running-configuring

Ejemplo de config: https://github.com/zalando/patroni/blob/master/postgres0.yml

Explicación de cada uno de los parámetros:
https://patroni.readthedocs.io/en/latest/SETTINGS.html#settings


# API
https://patroni.readthedocs.io/en/latest/rest_api.html

Podemos consultar quien es el master, replica, health, recargar, etc

## Modificar configuración
https://github.com/zalando/patroni/blob/master/docs/rest_api.rst#config-endpoint

curl -s -XPATCH -d \
        '{"loop_wait":5,"ttl":20,"postgresql":{"parameters":{"max_connections":"101"}}}' \
        http://localhost:8008/config | jq .


# patronictl
Ver el estado del cluster y sus miembros:
patronictl -c /etc/patroni.yml list NOMBRECLUSTER

## restart
Supuestamente patronictl restart reinicia los postgres, pero no me funciona.
Se hace la llamada a la API, se para pero no arranca (al menos con la imagen de timescaledb-ha para docker).

# etcd
Almacena la información en /service/$CLUSTER_NAME



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
https://www.cybertec-postgresql.com/en/postgresql-clustering-vip-manager/
https://github.com/cybertec-postgresql/vip-manager

Pequeño programa en go que se encarga de setear una VIP en el nodo activo.
Se dedica a pollear la key de etcd para ver quien es el master y añadir (o quitar) esa VIP según sea necesario.
Tiene que estar corriendo en todos los nodos.

## Instalación
https://github.com/cybertec-postgresql/vip-manager/releases/
En las releases de github dejan un .rpm y .deb

## Config
Por defecto se mete en y es donde la busca la unit de systemd:
/etc/default/vip-manager.yml

Tendremos que modificar:
  - trigger-key: el "namespace" usado en patroni (el nombre donde encontrar la clave, por ejemplo /service/NAMESPACE/leader)
  - trigger-value: el nombre de host usado en patroni (el que se seteará en la key "leader", patroni.yaml key "name")
  - ip / netmask / interface: la VIP a usar, su netmask y la interfac donde configurarla
  - los endpoints de etcd (y credenciales en caso de ser necesario, o comentarlos si no lo usamos; lo mismo con los certs de etcd)
