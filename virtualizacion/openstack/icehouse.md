OpenStack Icehouse
Datos sacados de las traspas Whats-New-In-Icehouse_Webcast.pdf y de http://redhatstackblog.redhat.com/2014/04/15/whats-new-in-icehouse-storage/

# Nova
Mas estabilidad y bugfixing
Upgrade desde Havana con downtime mínimo.
  Los nodos controller se actualizan antes, estos soportan tener workers de versiones previas
  Se puede actualizar sin afectar a las VM, excepto si hace falta actualizar el kernel del host

Nova puede responder a eventos de Neutron.
Metido caching en el scheduler.

## Service instance groups
Es para separar (o juntar) VMs en los mismos compute nodes.
La idea es, por ejemplo, marcar las instancias con mucho consumo IO para que no corran en los mismos hosts
Affinity / Anti-affinity schedule

Como funciona:
nova server-group-create NOMBRE_GRUPO --policy anti-affinity
nova boot --group NOMBRE_GRUPO

## API
XML deprecated
La v3 se supone que debería estar lista, pero no ha sido así, sale una v2.1

## nova-network
Neutro debe suceder a nova-network, pero como aún no lo ha hecho completado, se mantiene al menos para otra versión


# Storage / Cinder
## Storage tiers
Para tener Quality of Service
Ability to retype

## Disaster recovery
Podemos recuperar data y metadata
Exporting metadata: cinder backup-export backupid
Importing metadata: ...

# Storage / Swift
## Ssync
Wrapper around rsync
NO USAR EN PRODUCCIÓN

## Obtener info del cluster
curl http://<swift-proxy>/info

## Sync realms

## Storage / Glance


# Neutron
OVS and Linux Bridge move to ML2

OpenDaylight

New LBaaS


# Horizon
Ahora permite live migration


# Keystone
Usar la identidad entre nube pública y privada (un paso más cerca de la nube híbrida)
Se puede usar LDAP


# Heat
Puede orquestar cualquier tipo de recurso de openstack
Scaling via OS::HEAT::AutoScalingGroup/ScalingPolicy
Operator API para hacer operaciones en los stacks


# Database as a Service / Trove
Los usuarios pueden solicitar y trabajar con instancias de database
Multiple datastore support: MySQL, Percona, MongoDB, Redis, Cassandra and Couchbase
Parece que es una ayuda para crear instancias de bases de datos.


# What's next
Sahara: Ayuda a desplegar hadoop
Ironic: replaces bare metal driver
Marconi: web-friendly message queueing system (usa http)

