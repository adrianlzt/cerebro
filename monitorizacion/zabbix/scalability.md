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

# Sizing

Required space for a single value
Depends on database engine
History: 90 bytes per numeric data
Trends: 80 bytes per one aggregate

History in MB per day = NVPS*90*24*3600/1024/1024 = NVPS*7.416
Trends in MB per year = Items*80*24*365/1024/1024 = Items*0.668

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

# <https://www.zabbix.com/files/zabconf2017/fgiordano_pantonacci-zabbix_in_intesa_sanpaolo_bank.pdf>

Server+Frontend, 8vcpu, 20GB
DB, mysql, 8vcpu, 16GB
7000 hosts
390000 items
170000 triggers
5000 NVPS
