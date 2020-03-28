https://github.com/timescale/timescaledb

TimescaleDB is an open-source database designed to make SQL scalable for time-series data. It is engineered up from PostgreSQL, providing automatic partitioning across time and space (partitioning key), as well as full SQL support.

Que tal escala?
Transparent time/space partitioning​ for both scaling up (single node) and scaling out (forthcoming).


SELECT time_bucket('1 day', time_dimension_column_name) bucket, avg(column_name), stddev(column_name)
FROM hypertable
GROUP BY bucket;

# Docker
podman run --rm -it -p 5431:5432 timescale/timescaledb:latest-pg11
psql -p 5431 -h 127.0.0.1 -U postgres
