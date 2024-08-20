https://clickhouse.yandex/

open source column-oriented database management system capable of real time generation of analytical data reports using SQL queries.
C++

https://tech.olx.com/monitoring-as-a-service-a-modular-system-for-microservice-architecture-e53bcc144879?__s=trqwhcsp36pvqhgtigfv
Cuentan que han sustituido Graphite por esta base de datos


Mirar unix-tools/csv.md para usar el cliente de clickhouse para analizar .csv con one liners.


# Docker
https://hub.docker.com/r/clickhouse/clickhouse-server

docker run --rm -it --name clickhouse-server -v $(realpath ./clickhouse):/var/lib/clickhouse/ -p 8123:8123 -p 9000:9000 --ulimit nofile=262144:262144 clickhouse/clickhouse-server

Acceso cliente:
docker exec -it clickhouse-server clickhouse-client


# Cliente
Para conectar se usa el puerto 9000

clickhouse-client -h IP -u user -p password

La sintaxis tiene un parecido a mysql.
SHOW DATABASES;
USE nombredb;
SHOW TABLES;

create table foo(id int) primary key id;
insert into foo values(1),(2);


CREATE TABLE metrics_stats (
    host String,
    service String,
    metric_name String,
    metric_value Float32,
    metric_id Int32,
    timestamp DateTime,
    hostgroups Array(String)
) ENGINE = MergeTree()
ORDER BY (host, service, metric_name, timestamp);

INSERT INTO metrics_stats (host, service, metric_name, metric_value, metric_id, timestamp, hostgroups) VALUES
('host1', 'service1', 'metric1', 23.5, 1, now(), ['group1', 'group2']);

