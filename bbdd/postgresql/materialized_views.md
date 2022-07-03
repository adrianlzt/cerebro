https://di.nmfay.com/postgres-vs-mysql
Materialized views are like regular views, except the results of the specifying query are physically stored ('materialized') and must be explicitly refreshed. This allows database developers to cache the results of slower queries when the results don't have to be realtime.

CREATE MATERIALIZED VIEW mymatview AS SELECT * FROM mytab;

Si queremos actualizar los datos:
REFRESH MATERIALIZED VIEW mymatview;


https://github.com/sraoss/pg_ivm
Incremental View Maintenance (IVM) is a way to make materialized views up-to-date in which only incremental changes are computed and applied on views rather than recomputing
