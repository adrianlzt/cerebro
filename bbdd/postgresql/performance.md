https://news.ycombinator.com/item?id=14384370 Postgres performance analysis resulted in a 10x improvement in CPU use
https://news.ycombinator.com/item?id=12606480 Debugging PostgreSQL performance, the hard way
https://use-the-index-luke.com/
  SQL Indexing and Tuning e-Book

Mirar explain.md

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
https://blog.lawrencejones.dev/building-a-postgresql-load-tester/
https://github.com/gocardless/pgreplay-go/
reproduce los writes?

https://github.com/laurenz/pgreplay

https://github.com/darold/pgbadger
pg_badger which can run parallel jobs
pgbadger is for log analysis when during experiments we are "okay" to turn the full query logging on -- it's a great tool being developed for years; it can produce JSON, so it's machine/integration-friendly

https://gitlab.com/postgres-ai-team/nancy
pg_badger is also used by nancy, an benchmark experiment driver, so you can replay your logs, then change something, like add an index, and replay them again and nancy will show you to differential performance:

pgbench
it's quite convenient in many cases to use pgbench, when logs collections is not an option due to some reason -- instead of workload replay we can use workload simulation, based on underdtanding how every query group from pg_stat_statements looks like (first of all, the main important thing is % of calls in overall picture). It's good that pgbench allows to set "weights" for every workload "piece", using multiple -f options and @weght (for example, "pgbench -f tx1.sql@20 -f tx2.sql@80", etc)
