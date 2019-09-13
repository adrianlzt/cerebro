mirar:
pgpool.md
pgbouncer.md

activo-activo:
mirar replication.md



# hot standby
Detalle de los datos como funciona, mirar replication.md "Physical streaming replication"

Usar repmgr.md para gestionar replication

pg_promote()
  standby -> master (pg12)

Si un nodo standby está atendiendo a una query, si cambia a master, la query continuará sin problema.

Tendremos un nodo master y un nodo stand-by recibiendo los cambios aplicados en el master, donde se podrán hacer reads (si ponemos hot_standby = off, no permitiremos conexiones al standby).
Conflictos que podemos tener:
  - drop database (se hace un drop en el master pero hay una query en el select usando esa tabla. O se mata la query o se para temporalmente la replicación)
  - drop tablespace
  - access exclusive locks (estamos leyendo una tabla en el standby y el master quiere un exclusive lock)
  - cleanup records ("Snapshot too old" error)
  - low-level buffer celanup locks & deadlocks

Generalmente la solución es esperar un tiempo, pausando la replicación: max_standby_streaming_delay
Este tiempo es global, no de una query en particular. Si varias queries de 10' de duración son consecutivas pueden sumar 30'

hot_standby_feedback (en el slave), para que el master sepa que queries se están ejecutando en los slaves y no borre tuplas que se están usando en el standby

En caso de tener conflictos sin resolución:
  - la query da error
  - si es con la sessión, nos echa de la sesión

## Monitorizar conflictos
pg_stat_database
  número total de conflictos en la db

pg_stat_database_conflicts
  detalle sobre los conflictos


## Tunning
Podemos cambiar parámetros en la hot standby: work_mem, enable_seqscan, etc
maintenance_work_mem no tiene sentido, porque los índices se generan en el master




# pg_auto_failover
https://cloudblogs.microsoft.com/opensource/2019/05/06/introducing-pg_auto_failover-postgresql-open-source-extension-automated-failover-high-availability/
https://github.com/citusdata/pg_auto_failover
Para montar postgres con HA
Un cluster controller y n postgres con un proceso que los vigila localmente.
La extensión nos gestiona la replicación y el promote de standby a master.
Junto con la opción de libpq de conectar a varios hosts tenemos el HA.
Prueba con docker.
Bajar repo, hacer build de la imagen de docker: docker build -t pg_auto_failover:1.0.1 .

Creamos red para comunicar los containers por hostname:
docker network create --attachable pg_auto_failover
La resolución inversa de las IPs nos dará "HOSTNAME.pg_auto_failover". Esto es importante, porque cuando los postgres se conecten entre si para hacer la replicación, verán una IP, a la que harán la resolución inversa, obtendrán ese fqdn y lo buscarán en el pg_hba.conf para saber si permitirle el acceso
El monitor también necesita conectar por replication a los nodos.

Arrancamos el monitor:
  docker run --user root --rm -it --net pg_auto_failover --net pg_auto_failover --name monitor -h monitor.pg_auto_failover pg_auto_failover:1.0.1
  > su postgres -c "pg_autoctl create monitor --nodename $(hostname --fqdn)"
  Los nodos conectarán con: psql -h DIRECCIONIP -U autoctl_node -d pg_auto_failover
  Ahí estará corriendo la extensión pgautofailover (podemos verlo conectando y poniendo \dx)
  Conex desde el propio container: psql -U postgres
  Ver eventos:
  > su postgres -c "pg_autoctl show events"
  Ver estado:
  > su postgres -c "pg_autoctl show state"
  Si tenemos que arrancar de nuevo el monitor:
  pg_autoctl run

  Primer nodo de datos
  docker run --user root --rm -it --net pg_auto_failover --net pg_auto_failover --name nodea -h nodea.pg_auto_failover pg_auto_failover:1.0.1
  > su postgres -c "pg_autoctl create postgres --nodename $(hostname --fqdn) --monitor postgres://autoctl_node@monitor:5432/pg_auto_failover"
  En los eventos veremos como el nodo primero se pone como "init" (se registra) y cuando arranca el postgres se pone como single (el único en el pool por ahora)
  La conf del pg_hba.conf habilita el host "monitor" para acceder a la replicación, pero docker hace la resolución inversa a monitor.pg_auto_failover
  Agregamos esa entrada a mano y recargamos conf:
    host all "pgautofailover_monitor" monitor.pg_auto_failover trust
    pg_ctl reload
  Arrancamos el keeper (llama al monitor periodicamente para actualizar el estado y gestionar cambios de estado si es necesario). Corre en foreground
  > su postgres -c "pg_autoctl run"


  Segundo nodo de datos
  docker run --user root --rm -it --net pg_auto_failover --net pg_auto_failover --name nodeb -h nodeb.pg_auto_failover pg_auto_failover:1.0.1
  > su postgres -c "pg_autoctl create postgres --nodename $(hostname --fqdn) --monitor postgres://autoctl_node@monitor:5432/pg_auto_failover"
  Ahora el nodo primero pasara a "wait_primary" y el nuevo a "wait_standby" con "Assigned state" a "catchingup" mientras se sincroniza con el primero.
  Una vez sincronizado tendrá el current state y Assigned state a catchingup
  Arrancamos el keeper (llama al monitor periodicamente para actualizar el estado y gestionar cambios de estado si es necesario). Corre en foreground
  > su postgres -c "pg_autoctl run"
  Tras arrancar el keeper en este segundo nodo los estados pasarán a "primary" para el primero nodo y "secondary" para el segundo.


Si queremos sacar un nodo del pool, en el nodo que queremos sacar:
su postgres -c "pg_autoctl drop node"


Mato al nodo primario (kill -9 al keeper y postgres)
                  Name |   Port | Group |  Node |     Current State |    Assigned State
-----------------------+--------+-------+-------+-------------------+------------------
nodea.pg_auto_failover |   5432 |     0 |     1 |           primary |    demote_timeout
nodeb.pg_auto_failover |   5432 |     0 |     2 |  stop_replication |  stop_replication

Y tras unos segundos:
                  Name |   Port | Group |  Node |     Current State |    Assigned State
-----------------------+--------+-------+-------+-------------------+------------------
nodea.pg_auto_failover |   5432 |     0 |     1 |           primary |           demoted
nodeb.pg_auto_failover |   5432 |     0 |     2 |      wait_primary |      wait_primary

Ahora el nodob (secundario) a tomado el rol de primario y permite escrituras.


Tras arrancar de nuevo el keeper de nodea
                  Name |   Port | Group |  Node |     Current State |    Assigned State
-----------------------+--------+-------+-------+-------------------+------------------
nodea.pg_auto_failover |   5432 |     0 |     1 |           primary |    demote_timeout
nodeb.pg_auto_failover |   5432 |     0 |     2 |  stop_replication |  stop_replication

Y tras unos segundo, keeper automáticamente arranca postgres:
                  Name |   Port | Group |  Node |     Current State |    Assigned State
-----------------------+--------+-------+-------+-------------------+------------------
nodea.pg_auto_failover |   5432 |     0 |     1 |         secondary |         secondary
nodeb.pg_auto_failover |   5432 |     0 |     2 |           primary |           primary






https://paquier.xyz/postgresql-2/postgres-10-libpq-read-write/
libpq y postgres JDBC permiten definir varios hosts a donde conectar seleccionando que sea el master (read-write) o cualquiera (read-only)
Ejemplo con psql:
psql -d "postgresql://hostA,hostB/?target_session_attrs=read-write" -U usuario
Esto nos puede servir para tener HA sin necesidad de balanceador.
Si ponemos varios hosts, donde se puede conectar al primero, pero falla por que no existe el user o la database, no continuará probando con el resto de servers.


http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
Each has slaves. The vote database has one master one slave. The comment database has one master and 12 slaves.
Avoid reading from the master if possible and direct reads to the slaves to keep the master dedicated to writes.
Client libraries would load balance across slaves and try a new slave if one was busy.


# Recovery
Query para saber si somos una recovery (por lo tanto, no la master)
select pg_is_in_recovery();


# Estado de la replicación
Solo devuelve info si lo lanzamos en la primaria
select * from pg_stat_replication;

Ultima transaccion sincronizada
select pg_last_xact_replay_timestamp();
