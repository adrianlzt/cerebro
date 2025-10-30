mirar load-testing.md

<https://www.zabbix.com/documentation/4.0/manual/installation/requirements>
Pequeña tabla con ejemplos de hardware para distintos tamaños de instalación.

<https://assets.zabbix.com/files/events/2024/zabbix_summit_2024/day1/7_Karlis_Salins.pdf>
Notas sobre las mejoras en zabbix 7 y posibles acciones si tenemos bottle necks en distintas partes.

# Logs

Llevar los logs al journald, con LogType=system.
Mejor parseo, filtrar por log level, ona sola línea por evento.

# Databases

No usar Oracle, no da performance
IBM DB2, parece que tampoco funciona muy bien
SQLite no vale para zabbix-server, puede usarse para zabbix-proxy

En grandes instalaciones algunas queries pueden tardar entre 10 y 20s. Es esperable y aceptable.
Posiblemente quien cause estas queries tan grades sea el Configuration Syncer, que hace ciertas queries que atacan a prácticamente toda la tabla items.

Medir el lag entre el real time y los datos almacenados. Tenemos que elegir unos cuantos items que se actualicen cada minuto, la query tendrá que tener valores entre 0 y 60" (comprobar con explain que no es muy cara la query):
Aqui estamos cogiendo solo los items activos calculated (que los tenemos a 1m)
select ROUND(EXTRACT(EPOCH FROM now()))-clock AS lag from history where itemid IN ( select itemid from items,hosts where items.hostid=hosts.hostid and items.value_type=0 and items.type=15 and items.state=0 and items.status = 0 and items.flags=0 and hosts.name='NOMBRESERVERZABBIX') order by clock desc limit 1;

# History y trends

Por defecto zabbix tiene un proceso que revisa cada hora que métricas del history debe convertir a trends y borrar.
Esto en instalaciones grandes mata a la bbdd.
Mejor usar partitioning de postgres, creando nosotros un proceso que genere los trends y borre particiones con datos antiguos.
Mirar en instalacion.md

# Housekeeping

Generalmente usaremos particiones para las tablas trends y history, para poder hacer los borrados de manera más eficientes.
El housekeeper tambien borra los eventos más viejos de N días.
CUIDADO! Los problemas más antiguos de esos N días se borrarán.
Subir mucho el número de eventos también puede implicar peor performance (creo). Parece que una opción es particionar también esa tabla.

# Overview

No usar si tenemos muchos hosts. Es muy pesado.

# Cache

Mirar cache.md

# Imágenes / frontend

Si tenemos screens con muchas imágenes (50) y un tiempo de recarga pequeño (30"), esto realiza una carga muy grande sobre el frontend.
Se puede fundir la CPU de una máquina muy potente.

# Escalado

De las primeras cosas que necesitaremos aumentar para tener un cluster más grandes serán las cachés.
La recomendación

La cache donde se almacena la configuración (CacheSize).
La TrendCacheSize

La ocupación de los workers debe estar entre el 40-60%.

Los history syncers, la regla es uno por cada 1000 NVPS.

Los LLD workers (StartLLDProcessors), se suele dejar el número por defecto (2). Tienen mucho impacto en la db.

Con un único trapper estoy siendo capaz de ingestar 20kNVPS y pone que está al 20%.
20kNVPS al 40%. Cuando se hizo el cambio de hora (insert trends), se llenó durante unos segundos la cola Recv-Q del listener.
Pero parece que la cola Recv-Q si anda un poco alta.
Al cabo de las horas con 40kNVPS empieza a fluctuar.

## Proxies

Zabbix >=7:
Tener activado ProxyBufferMode en modo hybrid.

# Varios

<http://blog.zabbix.com/scalable-zabbix-lessons-on-hitting-9400-nvps/2615/>
<https://kloczek.wordpress.com/2016/05/05/punching-2k-selects-barrier-on-zabbix-mysql-db-backend/>

NVPS: new values per second
Se puede consultar este valor en Report > Status of Zabbix
Tambien en el item "Values processed by Zabbix server per second zabbix[wcache,values]" del "Template App Zabbix Server" (tambien tiene una graph: Zabbix server performance)
Mejor usar las gráficas para determinar los picos de NVPS y según eso determinar el número de DBSycners que hacen falta.
Lo mejor es usar el valor máximo de NVPS y usar la regla 1 DBSycners por cada 1000NVPs. Si tenemos MariaDB, usar un hilo de mariadb por cada DBSyncer que tengamos.
Monitorizar que no nos pasmos del límite 1DBSyncer/1kNVPS
history syncers
Del soporte: "it's better to keep the number of history syncer processes as small as possible"

Para los pollers, mientras tengamos ram, cuantos más pollers mejor.

Permisos finos, complican mucho las queries y matan la performance.

"if someone is observing own zabbix DB backend IO read/write ratio on storage layer bigger tahn 1/20 - 1/100, it probably means that this install needs more memory for server caches and/or DB cash and/or zfs ARC
discussion_new_backends.png (Abril 2015)
<https://www.linkedin.com/groups/161448/161448-5996549505196048385>

En esta discusión se tocan más temas para como hacer zabbix más "performant"

Parece que una típica mejora ante instalaciones muy grandes es poner los agentes en "active monitoring"

<https://www.zabbix.com/forum/showpost.php?p=184441&postcount=6>
Way bigger problem is with all queries generating all WRITE IOs (inserts and updates).
If someone has bigger and bigger scalability problems with zabbix DB backend way bigger improvements is possible to gain by stop using Linux and switching to Solaris (ZFS ARC)

<https://support.zabbix.com/browse/ZBXNEXT-714>
need scalable alternative for the history and items tables

Parece que zabbix 3.2 tiene problemas con permisos y queries.

# Stress test

<https://github.com/vulogov/zas_agent/blob/master/doc/zas-agent-0.1.1.pdf>
ZAS: zabbix agent simulator
Software que simular ser un agente para poder realizar test sobre la infraestructura

<https://www.zabbix.com/files/zabconf2017/fgiordano_pantonacci-zabbix_in_intesa_sanpaolo_bank.pdf>

Server+Frontend, 8vcpu, 20GB
DB, mysql, 8vcpu, 16GB
7000 hosts
390000 items
170000 triggers
5000 NVPS

# Disco / fio

Simular la carga que podría producir zabbix en la VM de postgres:

```bash
fio --name=reproduce-iostat-load --filename=fio_test_file --size=10G --rw=randrw --rwmixwrite=97 --bsrange=4k-32k --ioengine=libaio --direct=1 --numjobs=8 --iodepth=8 --runtime=120s --group_reporting
```

# Timescaledb

## Tamaño chunks

Por defecto configura 1 día para las tablas history.
Lo ideal es que los índices del chunk del día actual de las tablas history y history_uint quepan en el 25% de memoria de la máquina.
Con esto evitamos que para cada insert postgres tenga que hacer lecturas para poder encontrar la parte del índice a modificar.
El 25% es una recomendación para dejar espacio libre para otras cosas.
General PostgreSQL server tuning guidance suggests that active data reside in about 25% of the configured server memory. Pay special attention to the details that this includes all active tables and hypertables.

Zabbix ya comenta que 1 día por chunk puede no ser un valor correcto para todo el mundo:

<https://support.zabbix.com/si/jira.issueviews:issue-html/ZBXNEXT-4868/ZBXNEXT-4868.html#:~:text=1%20day%20is%20just%20a%20sensible%20default%2C%20not%20a%20universal%20recommendation.%20If%20you%20feel%201%20day%20doesn%27t%20match%20your%20history%20data%20rates%20you%20can%20always%20change%20it%20by%20calling%20set_chunk_time_interval()>.

1 day is just a sensible default, not a universal recommendation. If you feel 1 day doesn't match your history data rates you can always change it by calling set_chunk_time_interval().

## Cambiar tamaño particiones

Si queremos cambiar la tabla history a 6h (21600s) haremos:

```sql
SELECT set_chunk_time_interval('history', 21600);
```

Solo aplicará a las particiones que tengan que crearse a partir de ahora.

# Sizing / storage

<https://www.zabbix.com/documentation/7.0/en/manual/installation/requirements>

<https://adrianlzt.github.io/zabbix-postgres-calculator.html>
Calculadora para estimar uso de disco y cuanta memoria deberíamos tener.
La idea es que la las particiones de las tablas usadas (hot) deberían caber en el 25% de memoria de la base de datos.

Required space for a single value, contando tamaño de tabla y de índice.
Depends on database engine
History: 90 bytes per numeric data (en postgres+timescaledb, era más 110 bytes/value, mirar más abajo)
Trends: 80 bytes per one aggregate (con postgres+timescaledb+compresión creo que podemos usar 60 bytes/value)

```
History in MB per day = NVPS*90*24*3600/1024/1024 = NVPS*7.416
Trends in MB per year = Items*80*24*365/1024/1024 = Items*0.668
```

Zabbix 7.0 con timescaledb

```sql
SELECT
    'history' AS hypertable_name,
    pg_size_pretty(s.total_bytes) AS total_size,
    pg_size_pretty(s.index_bytes) AS index_size,
    pg_size_pretty(s.table_bytes) AS table_size,
    r.row_count AS approximate_row_count,
    CASE
        WHEN r.row_count > 0 THEN round(s.total_bytes / r.row_count)
        ELSE 0
    END AS avg_row_size_bytes
FROM
    hypertable_detailed_size('history') s,
    (SELECT * FROM approximate_row_count('history')) AS r(row_count)
UNION ALL
SELECT
    'history_uint' AS hypertable_name,
    pg_size_pretty(s.total_bytes) AS total_size,
    pg_size_pretty(s.index_bytes) AS index_size,
    pg_size_pretty(s.table_bytes) AS table_size,
    r.row_count AS approximate_row_count,
    CASE
        WHEN r.row_count > 0 THEN round(s.total_bytes / r.row_count)
        ELSE 0
    END AS avg_row_size_bytes
FROM
    hypertable_detailed_size('history_uint') s,
    (SELECT * FROM approximate_row_count('history_uint')) AS r(row_count);
```

En un zabbix 6.0 con postgres 14
hypertable_name | total_size | index_size | table_size | approximate_row_count | avg_row_size_bytes
-----------------+------------+------------+------------+-----------------------+--------------------
history | 1076 GB | 504 GB | 571 GB | 9750102016 | 118
history_uint | 761 GB | 378 GB | 384 GB | 7274875392 | 112

En un zabbix 7.0 con postgres 17
hypertable_name | total_size | index_size | table_size | approximate_row_count | avg_row_size_bytes
-----------------+------------+------------+------------+-----------------------+--------------------
history | 78 GB | 37 GB | 40 GB | 701157888 | 118
history_uint | 56 GB | 28 GB | 27 GB | 547325120 | 109

De la tabla de trends, con compresión tras 7 diás
hypertable_name | current_disk_size | uncompressed_size | compressed_size | compression_ratio | approximate_row_count | avg_row_size_bytes | avg_row_size_bytes_compressed
-----------------+-------------------+-------------------+-----------------+-------------------+-----------------------+--------------------+-------------------------------
trends | 65 GB | 397 GB | 39 GB | 10.18 | 632502144 | 110 | 66
trends_uint | 37 GB | 317 GB | 18 GB | 17.55 | 478064448 | 83 | 40

# Valores de referencia

## Proxy enviando 18.5kNVPS

Zabbix 7.0.19 + postgres-timescaledb

16GiB / 8 cores
6.4GiB mem available
load ~1.5

## 18000 NVPS

Hosts: 18.3k (17.8k activos)
Items: 2.7M (1.6M activos)
Triggers: 580k (325k activos)

Mayoría de agentes telegraf.

History 10d
Trends 365d

0.27 eventos/segundo

35 LLDs/s

Configuration cache: 2.56GiB

### Database

PostgreSQL 14.5 + timescaledb 2.7 con compresión.

DATADIR 1.9TiB

WAL 93GiB/hour con 20kNVPS.
Podemos usar este valor para asumir la generación de WAL files:
4.65 GiB/hour\*kNVPS

Al almacenar los en pgbackrest se comprimen, ocupan un 30% del tamaño original.

Backup full 1748GiB, comprimido 433GiB (comprimido ocupa un 25%)

Backup incremental diario 310GiB, comprimido 71GiB (comprimido ocupa un 20%).

Cada parece necesitar un 25% del tamaño total para el backup incremental.
