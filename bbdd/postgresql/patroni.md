https://patroni.readthedocs.io/en/latest/
https://github.com/zalando/patroni
https://github.com/zalando/spilo
https://www.opsdash.com/blog/postgres-getting-started-patroni.html
https://www.slideshare.net/ZalandoTech/high-availability-postgresql-with-zalando-patroni

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


# etcd
Almacena la información en /service/$CLUSTER_NAME



# Errores

## waiting for leader to bootstrap
Si el cluster ya se consiguió inicializar existirá una key /service/$CLUSTER_NAME/initialize, por lo que no se volverá a lanzar un initdb.
Si existe esa clave y hemos borrado ambos nodos del cluster de postgres, el cluster no podrá arrancar.
Tendremos que borrar esa key (etcdctl del /service/batman/initialize) o, mejor, sacar el cluster del DCS:
patronictl -c postgres.yml remove $CLUSTER_NAME
