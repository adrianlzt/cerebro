https://www.pgbarman.org/
https://github.com/2ndquadrant-it/barman

El gestor de backups para Postgres.
Un barman para todos los database servers que tengamos.
Es un servicio que tiene que estar corriendo todo el rato, llevándose los WAL files y realizando basebackups periódicamente.

Mejor usar la conf para que se lleve los wal con streaming (pg_receivewal)
streaming_archiver = on

backup_method = postgres
  que haga uso de pg_basebackup


# Comands
barman list-server
barman cron
barman diagnose
  json con toda la info

barman show-server serverId
barman check serverId
barman status serverId
barman replication-status serverId
barman backup serverId
barman list-backup serverId

barman recover server1 latest /tmp/test
  nos pone el último backup en ese server y podemos arrancarlo con: pg_ctl -D /tmp/test start
  podemos usar "latest", "last", "first", "oldest"

Pondremos un cron para ejecutar los "barman backup" y que se ejecuten los pg_basebackup
Podemos paralelizar (-j)

barman cron se ejecuta cada minuto para ejecutar tareas periódicas, retention_policy, compress wal, etc
Se meterá al instalarlo en el cron.d


# Retencion policy
Para ir borrando los backups y wal antiguos.

Config retention_policy, ejemplo:
RECOVERY WINDOW OF 2 WEEKS
REDUNDANCY 3

No se puede especificar tener backups más antiguos sin PITR.
En un futuro se podrá tener PITR de los últimos 7 días, por ejemplo, y backups simples de, por ejemplo, los primeros días de cada mes.



# Geography redundancy
Tener un master-slave barman cluster.
El slave lo que hará es llevarse una copia tirando de los datos del master.
El slave no se puede usar.
