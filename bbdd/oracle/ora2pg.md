https://ora2pg.darold.net/documentation.html

# Docker

https://hub.docker.com/r/georgmoser/ora2pg

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

```

```
