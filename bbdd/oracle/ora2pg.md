<https://ora2pg.darold.net/documentation.html>

# Docker

<https://hub.docker.com/r/georgmoser/ora2pg>

```bash
mkdir config
vi config/ora2pg.conf
docker run  \
    --name ora2pg \
    -it \
    -v /path/to/local/config:/config \
    -v /path/to/local/data:/data \
    georgmoser/ora2pg
```

ora2pg.conf

```conf
ORACLE_DSN      dbi:Oracle:host=localhost;sid=XE;port=1521
ORACLE_USER     zabbix
ORACLE_PWD      zabbix
TYPE            COPY
OUTPUT          data.sql
TRUNCATE_TABLE  1
JOBS            4
ORACLE_COPIES   2
ALLOW           FILE[tables_to_migrate.txt]
```

Selecionar tablas a migrar:

```
EXLUDE          ^history$ ^history_uint$ ^history_str$ ^history_log$ ^history_text$ ^trends$ ^trends_uint$
ALLOW           actions
```

Hacer transformaciones a los datos:

```
TRANSFORM_VALUE ACTIONS[name:NVL(name,'')];ACTIONS[esc_period:NVL(esc_period,'1h')];ACTIONS[formula:NVL(formula,'')]
```

Cuidado con el NVL(XX,''), volverá a generar el valor \N (null).
Lo que he hecho es hacer un sed para cambiar en el .sql los \N por ''.
