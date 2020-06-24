CREATE DATABASE "nombre";

DROP DATABASE [ IF EXISTS ] name;

pg13:
DROP DATABASE mydb FORCE;

Force pg<13.
Bloqueamos acceso a la db:
/* Method 1: update system catalog */
UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'mydb';
/* Method 2: use ALTER DATABASE. Superusers still can connect! /*
ALTER DATABASE mydb CONNECTION LIMIT 0;

Cerramos conex:
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'mydb';

DROP DATABASE mydb;



# Rename
ALTER DATABASE db RENAME TO newdb;


# Atributos

## Definir atributos
ALTER DATABASE XXX SET ...

## Ver atributos de una db
\drds

## Quitar
ALTER DATABASE name RESET configuration_parameter;
ALTER DATABASE name RESET ALL;
