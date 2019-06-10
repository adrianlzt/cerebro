Como montar un cluster.

Si usamos pg_pool, si el cliente arranca una transacción (BEGIN), esta siempre se considerará de escritura y se enviará al nodo master?

Como saber como parametrizar la postgres en caso de usar discos ssd. Como saber cuales son los valores correctos.

Como saber el contenido de una transacción que estamos viendo que está tardando mucho (vemos queries rápidas, pero que la tx lleva mucho tiempo corriendo)

Como sacar una query entera de la tabla de pg_stats?
Si es muy larga aparece cortada, como pillarla entera?


Query muy costosa. Como saber cual está siendo el cuello de botella.


BRIN versus Btree INDEXES
Mejor para zabbix history tables?
  work best when the data on disk is sorted: y esto como se controla?



https://hypopg.readthedocs.io/en/latest/
recomendable? opiniones?

pg_jbomon, para que sirve?


test.md Util? caso de uso? Con python o golang?


constraint_exclusion=on
que sentido tiene para tablas que no sean partition?
En zabbix lo tenemos a partition (valor por defecto)
En https://github.com/Doctorbal/zabbix-postgres-partitioning#common-partitioning-mistakes recomienda on (abierta issue para preguntar por qué)


INDEX CONCURRENTLY
Para simular un reindex, podemos hacer
CRETATE INDEX CONCURRENTLY indice_bis
DROP indice
ALTER INDEX indice_bis RENAME TO indice
?


Fillfactor (index.md y fragmentación.md)
Se dejan huecos en las páginas del almacenamiento en disco para almacenar los datos juntos?



Como funcionan los índices multikey?
Se puede buscar por cualquiera? O por las dos al mismo tiempo?
Mejoras entre crear un índice para cada valor?



Por qué no usa el índice?
create table simplenum(num int);
create index num_idx on simplenum (num );
insert into simplenum (num ) VALUES(1),(2),(3),(4),(5),(6),(7);
ANALYZE simplenum ;
explain select num from simplenum where num=3;
                       QUERY PLAN
---------------------------------------------------------
 Seq Scan on simplenum  (cost=0.00..1.09 rows=1 width=4)
   Filter: (num = 3)



Leyendo las mejoras que aporta el particionado, no veo en que caso el "hash partitioning" podría ser útil.



Donde encontrar la doc de: pg_get_partition_constraintdef



No podemos borrar porque no hay espacio suficente. La query DELETE falla.
Se puede hacer que no se ejecute dentro de una transacción para poder ir borrando según ejecutemos?
Hacer con una subselect (https://stackoverflow.com/questions/3421226/deleting-many-rows-without-locking-them)?
DELETE FROM
  table
WHERE
  id IN (SELECT id FROM table WHERE key = 'needle' LIMIT 10000);
