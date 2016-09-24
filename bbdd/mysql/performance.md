mirar latency.md

Ejecutar en el servidor mysqltuner.pl (esta el código en este directorio)
https://launchpad.net/mysql-tuning-primer

http://www.percona.com/files/presentations/WEBINAR2012-03-Optimizing-MySQL-Configuration.pdf
Muchas variables son de sesión, asi que tendremos que cambiarlas en el inicio si queremos que afecte a todas las conex.

http://www.mysqlperformanceblog.com/2014/01/28/10-mysql-settings-to-tune-after-installation/


SHOW STATUS LIKE 'perf%';

http://dev.mysql.com/doc/refman/5.5/en/performance-schema-status-monitoring.html
http://dev.mysql.com/doc/refman/5.5/en/performance-schema.html


http://www.mysqlperformanceblog.com/2007/01/19/tmp_table_size-and-max_heap_table_size/
http://dev.mysql.com/doc/refman/5.5/en/internal-temporary-tables.html
Una causa de baja performance puede ser que la base de datos llene su "tabla" en memoria y tenga que escribir en la partición /tmp

Tenemos que aumentar las variables: tmp_table_size y max_heap_table_size para conseguir que se almacene más en memoria
http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_tmp_table_size
http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_max_heap_table_size
If an in-memory temporary table exceeds the limit, MySQL automatically converts it to an on-disk MyISAM table

Estas variables son dinámicas, así que podemos modificarlas en caliente.


Indagando un poco más en el problema:
http://stackoverflow.com/questions/13259275/mysql-tmp-table-size-max-heap-table-size
RECOMMENDATION
In light of these things, here is what could be adjusted:
  join_buffer_size
  sort_buffer_size: Setting it larger than required globally will slow down most queries that sort. Experiment to find the best value for your workload.
    Buscando el mejor valor posible: http://stackoverflow.com/questions/17928366/what-is-the-recommended-max-value-for-join-buffer-size-in-mysql
     It really depends on the profile of your queries. 
  Create indexes that would be used
    in joins via eq_ref
    in sorts via index scans in order
The overall goal should be to prevent temp table creation as much as possible. Simply increasing tmp_table_size and max_heap_table_size lets inefficient queries and tables that lack proper indexing run amok.



Otra opción es que la particioń /tmp esté montada en memoria. Con una salvedad:
A replication slave needs some of its temporary files to survive a machine restart so that it can replicate temporary tables or LOAD DATA INFILE operations. If files in the temporary file directory are lost when the server restarts, replication fails.



Hay que tener también cuidado con la partición /tmp ya que puede crecer mucho.
Con icinga-web llena la partición /tmp que es un 1GB y la query muerte (así que posiblemente crecería más).
Mirar errores.md




# thread_cache_size #
http://anothermysqldba.blogspot.com.es/2013/09/mysql-optimization-tip-threadcachesize.html
http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_thread_cache_size
How many threads the server should cache for reuse.
This variable can be increased to improve performance if you have a lot of new connections.



https://github.com/blog/1880-making-mysql-better-at-github
MySQL tuning is very workload specific, and well-known configuration settings like innodb_buffer_pool_size often make the most difference in MySQL's performance. But on a major change like this, we wanted to make sure we covered everything, so we took a look at settings like innodb_thread_concurrency, innodb_io_capacity, and innodb_buffer_pool_instances, among others.
We were careful to only make one test configuration change at a time, and to run tests for at least 12 hours. We looked for query response time changes, stalls in queries per second, and signs of reduced concurrency. We observed the output of SHOW ENGINE INNODB STATUS, particularly the SEMAPHORES section, which provides information on work load contention.
