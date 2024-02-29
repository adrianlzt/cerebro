https://news.ycombinator.com/item?id=14384370 Postgres performance analysis resulted in a 10x improvement in CPU use
https://news.ycombinator.com/item?id=12606480 Debugging PostgreSQL performance, the hard way
https://use-the-index-luke.com/
  SQL Indexing and Tuning e-Book

Mirar explain.md
mira async_commit.md
  evitar esperar el flusheo a disco de los wal

WAL en un disco distinto, optimizado para escrituras secuenciales.
DATADIR debe permitir lecturas/escrituras random.

Los índices afectan al coste de INSERT/UPDATE.



https://postgresqlco.nf/en/doc/param/stats_temp_directory/
stats_temp_directory apuntar a un SSD para reducir IO


# eBPF / flame graphs
Analizar problemas de performance usando eBPF y flame graphs.
https://twitter.com/samokhvalov/status/1710176204953919574


# Performance
La mejora más basica, en inserts, es hacer batch inserts. Añadiendo varias entradas en la misma query.


https://powa.readthedocs.io/en/latest/index.html
The PostgreSQL Workload Analyzer is performance tool for PostgreSQL 9.4 and superior allowing to collect, aggregate and purge statistics on a PostgreSQL instance from various sources. It is implemented as a background worker.
Bajo impacto: https://powa.readthedocs.io/en/latest/impact_on_perf.html

This includes support for various stat extensions:
  pg_stat_statements, providing data about queries being executed
  pg_qualstats, providing data about predicates, or where clauses
  pg_stat_kcache, providing data about operating-system level cache
  pg_wait_sampling, providing data about wait events
  HypoPG, allowing you to create hypothetical indexes and test their usefulness without creating them

Nos da una interfaz gráfica para recolectar esta info.
Podemos ver por cada database que queries se están ejecutando, cuanto tardan, posibles mejoras a aplicar, etc.





# Load testers
Por lo hablado en el curso de Postgres, hacer replay no es una buena estrategía. Puede influir donde postgres realize actuaciones automáticas, por lo que no parece que el resultado sea interesante.

https://news.ycombinator.com/item?id=19605425
https://blog.lawrencejones.dev/building-a-postgresql-load-tester/
https://github.com/gocardless/pgreplay-go/
reproduce los writes?

https://github.com/laurenz/pgreplay
En una db, activamos el logging para guardar todas las transacciones.
Luego usamos pgreplay para reproducir esas llamadas en el mismo tiempo o más rápido.


https://github.com/darold/pgbadger
pg_badger which can run parallel jobs
pgbadger is for log analysis when during experiments we are "okay" to turn the full query logging on -- it's a great tool being developed for years; it can produce JSON, so it's machine/integration-friendly


https://gitlab.com/postgres-ai/nancy
pg_badger is also used by nancy, an benchmark experiment driver, so you can replay your logs, then change something, like add an index, and replay them again and nancy will show you to differential performance:

Parece que vale para lanzar un nuevo postgres, cargar una schema determinado, lanzar unas queries, luego realizar un cambio y lanzar las mismas queries y ver las diferencias en rendimiento.



## pgbench / load testing
https://www.postgresql.org/docs/current/pgbench.html

PGPASSWORD=xxx pgbench -U zabbix_server -h 172.16.0.95 zabbix -f history_test_basico.sql


Podemos pasar scripts customizados para simular la carga que necesitemos.
create table prueba2(id int);

Ejemplo de un script muy simple que hace un insert:
\set n random(1,10)
BEGIN;
INSERT INTO prueba2 VALUES(:n);
END;

Lo ejecutamos contra la database "pruebas" con:
pgbench -f insert-prueba2.sql pruebas

-t 1000
  cada cliente ejecuta 1000 tx (por defecto es 10)
-j N
  número de threads que usar, la idea es que podemos ocupar cada core con un thread. Los clientes se repartiran entre los threads (default 1)
-c N
  número de clientes concurrentes (default 1)

-r / --report-latencies
  saca un resumen de latencias al final de la ejecución

-L / --latency-limit=limit
  mostrar tx que tarden más de "limi" ms
  al terminar nos mostrará algo tipo: number of transactions above the 500.0 ms latency limit: 249/1607 (15.495 %)


it's quite convenient in many cases to use pgbench, when logs collections is not an option due to some reason -- instead of workload replay we can use workload simulation, based on underdtanding how every query group from pg_stat_statements looks like (first of all, the main important thing is % of calls in overall picture). It's good that pgbench allows to set "weights" for every workload "piece", using multiple -f options and @weght (for example, "pgbench -f tx1.sql@20 -f tx2.sql@80", etc)


Ejemplo: https://www.postgresql.org/message-id/CAKJS1f_1RJyFquuCKRFHTdcXqoPX-PYqAd7nz=GVBwvGh4a6xA@mail.gmail.com
Test setup:



CREATE TABLE partbench_ (date TIMESTAMP NOT NULL, i1 INT NOT NULL, i2 INT NOT NULL, i3 INT NOT NULL, i4 INT NOT NULL, i5 INT NOT NULL);
CREATE TABLE partbench (date TIMESTAMP NOT NULL, i1 INT NOT NULL, i2 INT NOT NULL, i3 INT NOT NULL, i4 INT NOT NULL, i5 INT NOT NULL) PARTITION BY RANGE (date);
\o /dev/null
select 'CREATE TABLE partbench' || x::text || ' PARTITION OF partbench
FOR VALUES FROM (''' || '2017-03-06'::date + (x::text || '
hours')::interval || ''') TO (''' || '2017-03-06'::date + ((x+1)::text
|| ' hours')::interval || ''');'
from generate_Series(0,9999) x;
\gexec
\o



partbench_insert.sql contains:
insert into partbench values('2018-04-26 15:00:00',1,2,3,4,5);


pgbench -n -T 60 -f partbench__insert.sql postgres



### sysbench
http://lwn.net/Articles/368908/

http://sysbench.sourceforge.net/docs/#database_mode

Example usage:

  $ sysbench --test=oltp --mysql-table-engine=myisam --oltp-table-size=1000000 --mysql-socket=/tmp/mysql.sock prepare
  $ sysbench --num-threads=16 --max-requests=100000 --test=oltp --oltp-table-size=1000000 --mysql-socket=/tmp/mysql.sock --oltp-read-only=on run

The first command will create a MyISAM table 'sbtest' in a database 'sbtest' on a MySQL server using /tmp/mysql.sock socket, then fill this table with 1M records. The second command will run the actual benchmark with 16 client threads, limiting the total number of request by 100,000.


sysbench --test=oltp --db-driver=mysql --oltp-table-size=1000000 --mysql-host=10.2.26.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest prepare
sysbench --db-driver=mysql --num-threads=16 --max-requests=100000 --test=oltp --oltp-table-size=1000000 --oltp-reconnect-mode=random --mysql-host=10.2.6.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest --max-time=60 run

sysbench --test=oltp --db-driver=mysql --oltp-table-size=1000000 --mysql-host=10.6.36.9 --mysql-user=user --mysql-password=pass --mysql-db=sbtest cleanup
