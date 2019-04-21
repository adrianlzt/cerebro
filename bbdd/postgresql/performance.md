https://news.ycombinator.com/item?id=14384370 Postgres performance analysis resulted in a 10x improvement in CPU use
https://news.ycombinator.com/item?id=12606480 Debugging PostgreSQL performance, the hard way
https://use-the-index-luke.com/
  SQL Indexing and Tuning e-Book

Mirar explain.md


https://powa.readthedocs.io/en/latest/index.html
The PostgreSQL Workload Analyzer is performance tool for PostgreSQL 9.4 and superior allowing to collect, aggregate and purge statistics on a PostgreSQL instance from various sources. It is implemented as a background worker.

This includes support for various stat extensions:
  pg_stat_statements, providing data about queries being executed
  pg_qualstats, providing data about predicates, or where clauses
  pg_stat_kcache, providing data about operating-system level cache

Nos da una interfaz gráfica para recolectar esta info.
Podemos ver por cada database que queries se están ejecutando, cuanto tardan, posibles mejoras a aplicar, etc.
