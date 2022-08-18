https://github.com/timescale/timescaledb

TimescaleDB is an open-source database designed to make SQL scalable for time-series data. It is engineered up from PostgreSQL, providing automatic partitioning across time and space (partitioning key), as well as full SQL support.

Que tal escala?
Transparent time/space partitioning for both scaling up (single node) and scaling out (forthcoming).

# Licencia
https://docs.timescale.com/timescaledb/latest/timescaledb-edition-comparison/#timescaledb-apache-2-vs-timescaledb-community-editions

Licencia "tipo elastic" que permite ejecutarla gratis pero no en modo SaaS.
Tiene parte que sí es complétamente open source (apache2).


# Toolkit
https://github.com/timescale/timescaledb-toolkit/tree/main/docs
Number of utilities for working with time-series data

Parte de las "hyperfunctions" bienen en este toolkit
https://docs.timescale.com/timescaledb/latest/how-to-guides/hyperfunctions/install-toolkit/#install-toolkit-on-self-hosted-timescaledb


# High availability
https://docs.timescale.com/timescaledb/latest/how-to-guides/replication-and-ha/about-ha/#failover

Recomiendan patroni.



# Query
SELECT time_bucket('1 day', time_dimension_column_name) bucket, avg(column_name), stddev(column_name)
FROM hypertable
GROUP BY bucket;

# Docker
podman run --rm -it -p 5431:5432 timescale/timescaledb:latest-pg11
psql -p 5431 -h 127.0.0.1 -U postgres

podman pull docker.io/timescale/timescaledb-ha:pg14.5-ts2.7.2-patroni-static-primary-latest
