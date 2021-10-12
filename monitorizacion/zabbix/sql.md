https://www.zabbix.com/documentation/3.4/manual/api/reference/host/object#host
  En los "Object reference" podemos ver los mapeos de valores a significado
Modelo de la bbdd (version 2.x): https://zabbix.org/wiki/Database_Schemas

Esquema tablas:
https://zabbix.org/wiki/Docs/DB_schema/4.0


Accediendo directamente a la base de datos de zabbix.

Tabla items
Descripción e id de todos los items.
Generalmente podemos acceder fácilmente a través de: key_
itemid es el valor que usaremos para buscar el item en otras tablas.

Buscar por una key:
select itemid,name,key_,value_type from items where key_ like '%Beta%';

Ver los valores recordados de la interfaz web para un usuario
select users.alias,profiles.profileid,profiles.idx,profiles.value_id,profiles.value_int,profiles.value_str from users,profiles where users.userid=profiles.userid and users.alias='adrian';
Si queremos quitar uno de estos valores, borraremos la fila:
delete from profiles where profileid=96;


value_type
El tipo de dato que almacena el item:
 0 -> double/float
 1 -> char
 2 -> log
 3 -> uint
 4 -> text


type (trigger)
0 - (default) do not generate multiple events;
1 - generate multiple events.
7 - ¿? No lo veo en el código


type (item)
0 - Zabbix agent
1 - SNMPv1 agent
2 - Zabbix trapper
3 - simple check
4 - SNMPv2 agent
5 - Zabbix internal
6 - SNMPv3 agent
7 - Zabbix agent (active)
8 - Zabbix aggregate
9 - web item
10 - external check
11 - database monitor
12 - IPMI agent
13 - SSH agent
14 - TELNET agent
15 - calculated
16 - JMX agent
17 - SNMP trap
18 - Dependent item

Status
0 - enabled
1 - disabled
3 - template (para la tabla hosts)
5 - proxy

alert - status
0 - not sent
1 - sent
2 - failed

hosts - Flags
0 - normal host
2 - algo raro interno para discover de VMs? como un template de host descubierto? host prototype?
4 - nodo discovered

State (items y triggers)
0 - normal
1 - not supported

items - Flags:
0 - a plain item
1 - items lld discovery
2 - item prototype de un host
3 - sin uso?
4 - a discovered item

Triggers, templateid: si el campo no es null, quiere decir que es un trigger heredado de un linked template.


# History
El histórico de los datos se almacena en tablas según su tipo:
double/float -> history
char         -> history_str
log          -> history_log
uint         -> history_uint
text         -> history_text

Si usamos ElasticSearch, estas tablas se almacenan en ES en vez de la SQL.



# Events / problems
https://www.zabbix.com/documentation/4.2/manual/api/reference/event/object#host
https://www.zabbix.com/documentation/current/manual/api/reference/problem/object
Obtenidos de include/common.h

source
0 - trigger
1 - discovery
2 - auto registration
3 - internal (indican cambios de estado de items/triggers/LLDs, entre ok y unsupported)

object
0 - trigger (si source=0, object=0 siempre)
1 - discovery host
2 - discovery service
3 - zabbix active
4 - item
5 - lld rule

value (trigger events):
0 - OK;
1 - problem.

discovery events:
0 - host or service up;
1 - host or service down;
2 - host or service discovered;
3 - host or service lost.

internal events:
0 - 'normal' state;
1 - 'unknown' or 'not supported' state.


acknowledged
0 - not acknowledged
1 - acknowledged

interface.type:
1 - agent
2 - snmp
3 - ipmi
4 - jmx

La tabla problem mantiene los problems sin resolver.
Una vez resueltos podemos usar la tabla event_recovery para matchear los que están resueltos.

-- problemas abiertos (quitando duplicados, con el distinct). No coincide exactamente con el número de la interfaz web por que el web esconde las dependencias
SELECT DISTINCT
    p.eventid,
    h.host,
    h.name AS hostname,
    p.name AS problem,
    (ARRAY['Not classified', 'Information', 'Warning', 'Average', 'High', 'Disaster'])[p.severity+1] AS severity,
    p.severity AS severitynum
FROM
    problem p
    JOIN functions f ON p.objectid = f.triggerid
    JOIN triggers t USING (triggerid)
    JOIN items i USING (itemid)
    JOIN hosts h USING (hostid)
WHERE
    source = 0
    AND r_eventid IS NULL
    AND h.status = 0
    AND i.status = 0
    AND t.status = 0;


-- problemas que estaban abiertos en un momento determinado (y ahora ya están cerrados), para un host determinado
WITH DATE AS ( SELECT ROUND(EXTRACT(EPOCH FROM '2019-03-12 03:30:12'::timestamptz))::int AS DATE)
SELECT
   hosts.host,
   triggers.description,
   to_timestamp(events.clock) AS START,
   to_timestamp(r_events.clock) AS END
FROM
   events
   JOIN event_recovery ON events.eventid = event_recovery.eventid
   JOIN events as r_events ON event_recovery.r_eventid = r_events.eventid,
   triggers,
   functions,
   items,
   hosts
WHERE
   events.source = 0 -- solo eventos generados por triggers
   AND events.object = 0
   AND events.objectid = triggers.triggerid
   AND functions.triggerid = triggers.triggerid
   AND functions.itemid = items.itemid
   AND items.hostid = hosts.hostid
   AND events.clock < (SELECT DATE FROM DATE)
   AND (r_events.clock > (SELECT DATE FROM DATE) OR r_events.clock IS NULL)
   AND hosts.host = 'somehost'
ORDER BY events.clock ASC;


-- problemas abiertos en un momento determinado para un host determinado
-- miramos la tabla problems, que se va purgando, por lo que solo estarán recientes
-- CUIDADO! aparecen filas duplicadas si la expresión del trigger usa items distintos (una línea por item)
WITH DATE AS ( SELECT ROUND(EXTRACT(EPOCH FROM '2019-03-12 03:30:12'::timestamptz))::int AS DATE)
SELECT
   hosts.host,
   triggers.description,
   to_timestamp(problem.clock) AS START
FROM
   problem,
   triggers,
   functions,
   items,
   hosts
WHERE
   problem.source = 0 -- solo eventos generados por triggers
   AND triggers.status = 0 -- solo triggers activos
   AND r_eventid IS NULL
   AND problem.objectid = triggers.triggerid
   AND functions.triggerid = triggers.triggerid
   AND functions.itemid = items.itemid
   AND items.hostid = hosts.hostid
   AND problem.clock < (SELECT DATE FROM DATE)
   AND hosts.host = 'somehost'
ORDER BY problem.clock ASC;


-- número de problems abiertos por host
SELECT
   hosts.host, count(*)
FROM
   problem,
   triggers,
   functions,
   items,
   hosts
WHERE
   problem.source = 0 -- solo eventos generados por triggers
   AND triggers.status = 0 -- solo triggers activos
   AND r_eventid IS NULL
   AND problem.objectid = triggers.triggerid
   AND functions.triggerid = triggers.triggerid
   AND functions.itemid = items.itemid
   AND items.hostid = hosts.hostid
GROUP BY hosts.host
ORDER BY COUNT(*) DESC;


-- número de problems abiertos
select count(*) from problem where problem.source = 0 AND r_eventid is null;
MAL! tenemos que al menos coger solo los triggers enabled y los objectid que hagan match a un triggerid


## Alerts
-- alertas pendientes de enviar agrupadas por media type
select media_type.description,count(*) from alerts,media_type where media_type.mediatypeid = alerts.mediatypeid and alerts.status=0 group by media_type.description;



# Trigger - functions - items - hosts
select hosts.host,items.key_,triggers.description from triggers join functions USING(triggerid) join items using (itemid) join hosts using (hostid) limit 10;


# Queries varias
Número de items en la tabla history agrupados por buckets de 10', filtrado entre unos timestamps:
select count(*),date from history,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:33:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_uint,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:33:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_log,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:33:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_str,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:33:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_text,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:33:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;

Otra forma de lanzar la query. Haciendo uso del indice? (por no convertir el "clock" en el where?). Nos saca "count, date_from y date_to"
SELECT
  count(*),to_timestamp(date_from) as date_from,to_timestamp(date_to) as date_to
FROM
  partitions.history_uint_2019_02_19,
  history_str,
  (
    -- quitamos la fila donde no tenemos "from" y "to"
    SELECT * FROM
      (
        -- generamos el campo "from" y "to" para el rango elegido
        SELECT
          LAG(a.date) OVER() AS date_from, a.date AS date_to
        FROM
          (
            -- generamos los epoch del rango de tiempo que queremos
            SELECT
              ROUND(EXTRACT(EPOCH FROM
                GENERATE_SERIES(
                  '2019-02-19 06:00:00+01'::timestamp,
                  '2019-02-19 16:00:00+01'::timestamp,
                  '1 hour')
              ))::int AS date
        ) a
      ) b
    WHERE
      b.date_from > 0
  ) AS d
WHERE
  clock BETWEEN date_from AND date_to
GROUP BY
  date_from,date_to
ORDER BY
  date_from;



Número de items en la tabla history_uint, type trappers, agrupados por buckets de 10' (más facil con generate_series):
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history_uint where clock > 1527379200 and clock < 1527393600 and itemid IN (select itemid from items where type=2) group by hour,min10 order by hour,min10;

Número de eventos trigger contados cada hora para un intervalo determinado:
select count(*),date_trunc('hour',to_timestamp(clock)) as hour from events where source=0 and object=0 and clock>1536745132 and clock<1536788332 group by hour order by hour;

Número de eventos por segundo de los últimos 10 minutos, organizados por source y object (mirar explicación de valores en la sección de Events, más arriba):
select elt(source,'trigger','discovery','auto registration','internal') as source, elt(object,'trigger','host','service','host','item','lld') as object, elt(value,'ok/up/normal', 'problem/down/unkown/not supported', 'discovered', 'lost'), count(*)/(10*60.0) as events_per_sec from events where clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '10 MIN')))::int GROUP BY source,object,value;
  NOTA: elt() es una función, cón código "SELECT $2[$1+1];", podemos usar (ARRAY['a','b'])[type+1] en vez de usar la función

Eventos internal por fallos de triggers, items, LLDs:
select hosts.host,to_timestamp(clock),triggers.description,triggers.error from events,triggers,functions,items,hosts where hosts.hostid=items.hostid AND items.itemid=functions.itemid AND functions.triggerid=triggers.triggerid AND triggers.triggerid=events.objectid AND clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '10 MIN')))::int AND object=0 and source=3 and events.value=1 order by events.clock desc limit 40;
select hosts.host,to_timestamp(clock),items.name,items.error from events,items,hosts where hosts.hostid=items.hostid AND items.itemid=events.objectid AND clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '10 MIN')))::int AND object=4 and source=3 and events.value=1 order by events.clock desc limit 40;
select hosts.host,to_timestamp(clock),items.name,items.error from events,items,hosts where hosts.hostid=items.hostid AND items.itemid=events.objectid AND clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '10 MIN')))::int AND object=5 and source=3 and events.value=1 order by events.clock desc limit 40;
   esta última sería para los LLDs pero no tenía resultados, no se seguro si está bien

Todos los items de un hostgroup:
select items.name,items.itemid from hosts_groups,groups,items where items.hostid=hosts_groups.hostid and hosts_groups.groupid=groups.groupid and groups.name='SOMEHOSTGROUP' limit 10;

Todos los items de un host por su hostname:
select items.name,hosts.hostid from hosts,items where hosts.name='SOMEHOSTNAME' and hosts.hostid = items.hostid;

Items not supported (si metemos "and items.flags=1" solo veremos los items LLD fallando):
select hosts.host,items.name from hosts,items where items.hostid=hosts.hostid and state=1;

Triggers not supported:
select hosts.name,triggers.description from functions,triggers,items,hosts where functions.triggerid=triggers.triggerid and functions.itemid=items.itemid and items.hostid=hosts.hostid and triggers.state=1

Cuando enganchamos desde functions hacia triggers (para luego poder tirar de items hasta los hosts), si tenemos recovery expressions podemos encontrarnos con resultados duplicados.
Esto es porque la función que se usa para el recover también engancha con el trigger, por lo que tendremos dos conexiones desde host->item->functions hacia el trigger.
Incluso, si el recovery fuera con un item de otro host, podríamos tener dos hosts distintos apuntando al mismo trigger.


Items que van a ser borrados por que no se descubren más con el LLD:
select * from (select key_,count(*) from item_discovery where ts_delete <> 0 group by key_) a order by a.count;

La tabla item_discovery almacena la relación entre items descubiertos y sus prototypes (key_ null y lastcheck = 0)
y entre los items prototypes y los parent discovery, los items LLD (key_ not null y lastcheck <> 0)
La key_ de item_discovery será la key_ del parent_item
Items descubiertos de un LLD de un host:
select id2.lastcheck,items.key_ from item_discovery as id1, item_discovery as id2, items  where id1.parent_itemid=(select items.itemid from hosts,items where hosts.hostid=items.hostid and hosts.host= 'somehost' and items.name = 'telegraf.lld.internal_gather.input') and id1.itemid=id2.parent_itemid and id2.itemid=items.itemid;

Número de items LLD (ejemplo telegraf.lld.xxx). En esta cuenta se cuelan los de los templates:
select count(*) from (select parent_itemid from item_discovery where key_ = '' group by parent_itemid) a;


LLDs enviados por los clientes por segundo (media sobre los recibidos en la última hora):
WITH llds as
(
   select
      parent_itemid as itemid
   from
      item_discovery
   where
      key_ = ''
   group by
      parent_itemid
)
,
latest_discover as
(
   select
      llds.itemid,
      id2.lastcheck
   from
      llds,
      item_discovery id1,
      item_discovery id2
   where
      id1.itemid = id2.parent_itemid
      and id1.parent_itemid = llds.itemid
      and id2.ts_delete = 0
   GROUP BY
      llds.itemid,
      id2.lastcheck
)
select
   count(*)/(60*60.0) as llds_per_sec
from
   latest_discover
where
   lastcheck > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '1 HOUR')))
;




Cuantos items de cada tipo tenemos, agrupados por activados/desactivados y poniendo su nombre en vez del type id. Ignoranmos los items de las templates:
SELECT
  (ARRAY[
    'Zabbix Agent',
    'SNMPv1 agent',
    'Zabbix trapper',
    'simple check',
    'SNMPv2 agent',
    'Zabbix internal',
    'SNMPv3 agent',
    'Zabbix agent (active)',
    'Zabbix aggregate',
    'Web item',
    'External check',
    'Database monitor',
    'IPMI agent',
    'SSH agent',
    'TELNET agent',
    'Calculated',
    'JMX agent',
    'SNMP trap',
    'Dependent item'
  ])[type+1] AS type,
  (ARRAY[
    'ON',
    'OFF'
  ])[items.status+1] AS status,
  (ARRAY[
    'OK',
    'NOT SUPPORTED'
    ])[items.state+1] AS state,
  count(*)
FROM items,hosts
WHERE
  items.hostid=hosts.hostid
  AND hosts.status <> 3
  GROUP BY items.type,  items.status, items.state
  ORDER BY items.type, items.status DESC;




IMPACTO de las metricas segun su delay (excepto trappers)
Se calcula que tipos de items y que delays están generando más metricas contra zabbix.
Se omiten items desactivados, trappers (de estos últimos no podemos saber cuando van a enviar datos) e items de templates:
select case when items.type=0 then 'Zabbix Agent' when items.type=1 then 'SNMPv1 agent' when items.type=2 then 'Zabbix trapper' when items.type=3 then 'simple check' when items.type=4 then 'SNMPv2 agent' when items.type=5 then 'Zabbix internal' when items.type=6 then 'SNMPv3 agent' when items.type=7 then 'Zabbix agent (active)' when items.type=8 then 'Zabbix aggregate' when items.type=9 then 'web item' when items.type=10 then 'external check' when items.type=11 then 'database monitor' when items.type=12 then 'IPMI agent' when items.type=13 then 'SSH agent' when items.type=14 then 'TELNET agent' when items.type=15 then 'calculated' when items.type=16 then 'JMX agent' when items.type=17 then 'SNMP trap' when items.type=18 then 'Dependent item' end as type,items.delay,count(*),count(*)/items.delay as points_per_sec from items,hosts where items.hostid=hosts.hostid and hosts.status <> 3 and items.status=0 and items.type <> 2 group by items.type,items.delay order by points_per_sec desc, items.type desc limit 10;


20 items pasivos (Zabbix Agent) enabled de hosts que no sean templates:
select hosts.name as host,items.name as item from items,hosts where items.type=0 and items.status=0 and hosts.status<>3 and items.hostid=hosts.hostid;
select count(*) from items,hosts where items.type=0 and items.status=0 and hosts.status<>3 and items.hostid=hosts.hostid;

Lag entre el tiempo actual y el ultimo dato indexado.
Hacer un order by clock sobre toda la tabla es demasiado costoso, por eso solo lo hacemos sobre un número limitado de items (20 items Zabbix Agent del host SOMEHOST).
select now()-to_timestamp(clock) AS lag from history where itemid IN (select itemid from items,hosts where items.hostid=hosts.hostid and value_type=0 and hosts.name='SOMEHOST' limit 20) order by clock desc limit 1;


Número de items enabled por hostgroup:
select g.name,count(*) from hosts as h, items as i, hosts_groups, groups as g where i.hostid=h.hostid and h.hostid=hosts_groups.hostid and hosts_groups.groupid=g.groupid and g.name <> 'Templates' and i.status=0 group by g.name limit 10;

Top 10 de hostgroups por número de items pasivos (enabled):
select g.name,count(*) from hosts as h, items as i, hosts_groups, groups as g where i.hostid=h.hostid and h.hostid=hosts_groups.hostid and hosts_groups.groupid=g.groupid and g.name <> 'Templates' and i.type=0 and i.status=0 group by g.name order by count desc limit 10;


Query para obtener los templates que tienen triggers con nodata asociados a items trapper (solo triggers originales, no heredados de linked templates):
select 60*count(clock)::float/(max(clock)-min(clock)) as points_per_min,hosts.host,items.key_ from partitions.history_2018_11_26 as h,hosts,items WHERE h.itemid=items.itemid AND items.hostid=hosts.hostid AND clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '40m')))::int and clock < ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '35m')))::int group by h.itemid,items.key_,hosts.host HAVING (max(clock)-min(clock)) <> 0 order by points_per_min desc;



Tamaño de las partitions por día:
SELECT substring(relname from '20.*') as date, pg_size_pretty(sum(pg_total_relation_size(c.oid))) FROM pg_class c LEFT JOIN pg_namespace n ON n.oid = c.relnamespace WHERE relkind = 'r' and nspname = 'partitions' and relname like 'history%_' and c.reltuples <> 0 group by date order by date;


Templates que se están usando por algún host al menos:
select hostid,host from hosts where status = 3 and hostid IN (select ht.templateid from hosts_templates ht, hosts h where ht.hostid = h.hostid and h.status != 3 and flags=0);

Templates que pertenecen a un grupo:
select h.host from hosts h, hosts_groups hg, groups g where h.hostid = hg.hostid AND hg.groupid = g.groupid AND g.name = 'Templates/Metrics' limit 10;

Tipos de file systems encontrados por telegraf:
select fs,count(*) from (select (string_to_array(key_,','))[2] as fs from items where flags <> 2 and key_ LIKE 'telegraf.disk.inodes_used[%') a group by fs;

Funciones que ejecutan los timers:
SELECT function, parameter, count(*) FROM functions where function IN ('nodata', 'date', 'dayofmonth', 'dayofweek', 'time', 'now') GROUP BY function, parameter ORDER BY count;

Para zabbix 4:
SELECT name, parameter, count(*) FROM functions where name IN ('nodata', 'date', 'dayofmonth', 'dayofweek', 'time', 'now') GROUP BY name, parameter ORDER BY count;


Obtener las últimas métricas de latest data, como lo hace Zabbix Web:
SELECT * FROM history_uint h WHERE h.itemid='13664490' AND h.clock>1552988052 ORDER BY h.clock DESC LIMIT 2 OFFSET 0



Hosts que tienen items descubiertos por LLDs, donde el LLD hace más de 4 días que no se lanza (ignorando hosts desactivados, o items/hosts que van a ser borrados).
Se muestra el hostname, cuantos LLDs tiene sin datos recientes y la fecha más reciente en que recibió datos alguno de los LLDs sin datos recientes:
WITH not_working_lld AS
  (SELECT DISTINCT hosts.host,
                   items.key_,
                   item_discovery_proto.lastcheck
   FROM items,
        item_discovery AS item_discovery_proto,
        item_discovery AS item_discovery_lld,
        hosts
   LEFT JOIN host_discovery ON host_discovery.hostid=hosts.hostid
   WHERE hosts.hostid=items.hostid
     AND item_discovery_lld.itemid=item_discovery_proto.parent_itemid
     AND items.itemid=item_discovery_lld.parent_itemid
     AND hosts.status=0
     AND item_discovery_proto.lastcheck < (ROUND(EXTRACT(EPOCH
                                                         FROM (now() - INTERVAL '4 DAY'))))
     AND item_discovery_proto.lastcheck <> 0
     AND item_discovery_proto.ts_delete=0
     AND (host_discovery.ts_delete IS NULL OR host_discovery.ts_delete = 0)
   ORDER BY hosts.host)
SELECT HOST,
       to_timestamp(max(lastcheck)) AS max_lastcheck,
       count(*)
FROM not_working_lld
GROUP BY HOST
ORDER BY max(lastcheck);



Para obtener el nombre y fecha de los LLDs sin datos recientes:
SELECT DISTINCT hosts.host,
                items.key_,
                items.itemid,
                to_timestamp(item_discovery_proto.lastcheck) AS lastcheck
FROM items,
     item_discovery AS item_discovery_proto,
     item_discovery AS item_discovery_lld,
     hosts
LEFT JOIN host_discovery ON host_discovery.hostid=hosts.hostid
WHERE hosts.hostid=items.hostid
  AND item_discovery_lld.itemid=item_discovery_proto.parent_itemid
  AND items.itemid=item_discovery_lld.parent_itemid
  AND hosts.status=0
  AND items.status=0
  AND item_discovery_proto.lastcheck < (ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '4 DAY'))))
  AND item_discovery_proto.lastcheck <> 0
  AND item_discovery_proto.ts_delete=0
  AND (host_discovery.ts_delete IS NULL OR host_discovery.ts_delete = 0)
  AND hosts.host = 'NOMBREHOST';



Triggers con nombres duplicados para un mismo host:
with hosts_triggers as (
  select
    h.host,
    t.description,
    t.triggerid
  from
    hosts h
    join items i using(hostid)
    join functions using (itemid)
    join triggers t using (triggerid)
  where
    t.flags <> 2
  group by
    t.description,
    h.host,
    t.triggerid
)
select
  ht.host,
  ht.description
from
  hosts_triggers ht
group by
  ht.host,
  ht.description
having
  count(*) > 1;





Triggers disparados, que generaron eventos de problema, pero que ya fueron borrados por el housekeeper.
Se muestra el host, trigger y la fecha en que se disparó.
select host,triggers.description,to_timestamp(lastchange) from hosts,items,functions,triggers left join problem ON triggers.triggerid=problem.objectid WHERE hosts.hostid=items.hostid and items.itemid=functions.itemid and functions.triggerid=triggers.triggerid and triggers.value=1 and triggers.status=0 and problem.eventid is null;


Hosts en mantenimiento (cada minuto los timer actualizan el estado)
select host from hosts where maintenance_status=1;



# Audit
details
detalle de la operación

action
0 AUDIT_ACTION_ADD
1 AUDIT_ACTION_UPDATE
2 AUDIT_ACTION_DELETE
3 AUDIT_ACTION_LOGIN
4 AUDIT_ACTION_LOGOUT
5 AUDIT_ACTION_ENABLE
6 AUDIT_ACTION_DISABLE

resourcetype
0  AUDIT_RESOURCE_USER
2  AUDIT_RESOURCE_ZABBIX_CONFIG
3  AUDIT_RESOURCE_MEDIA_TYPE
4  AUDIT_RESOURCE_HOST
5  AUDIT_RESOURCE_ACTION
6  AUDIT_RESOURCE_GRAPH
7  AUDIT_RESOURCE_GRAPH_ELEMENT
11 AUDIT_RESOURCE_USER_GROUP
12 AUDIT_RESOURCE_APPLICATION
13 AUDIT_RESOURCE_TRIGGER
14 AUDIT_RESOURCE_HOST_GROUP
15 AUDIT_RESOURCE_ITEM
16 AUDIT_RESOURCE_IMAGE
17 AUDIT_RESOURCE_VALUE_MAP
18 AUDIT_RESOURCE_IT_SERVICE
19 AUDIT_RESOURCE_MAP
20 AUDIT_RESOURCE_SCREEN
22 AUDIT_RESOURCE_SCENARIO
23 AUDIT_RESOURCE_DISCOVERY_RULE
24 AUDIT_RESOURCE_SLIDESHOW
25 AUDIT_RESOURCE_SCRIPT
26 AUDIT_RESOURCE_PROXY
27 AUDIT_RESOURCE_MAINTENANCE
28 AUDIT_RESOURCE_REGEXP
29 AUDIT_RESOURCE_MACRO
30 AUDIT_RESOURCE_TEMPLATE
31 AUDIT_RESOURCE_TRIGGER_PROTOTYPE


Ejemplo de query buscando un update (action=1) de un host (resourcetype=4)
select *,to_timestamp(clock) as fecha from auditlog join auditlog_details using (auditid) where action=1 and resourcetype=4 and resourcename like '%zbxalerter' limit 10;





# Unreachable pollers
Ver los hosts que están unreachable, ocasionando que estos reporten estar ocupados.
select host,error,to_timestamp(disable_until) from hosts where disable_until <> 0;


# Tocando la bbdd / inserts
Es el frontend el que se encarga de generar elementos en la bbdd.

La incrementalidad de los IDs la lleva a cabo Zabbix, almacenando en la tabla "ids" el útimo ID generado por tabla y field.

En la tabla de ids estará el último utilizado.

Ejemplo de update:
begin;
SELECT nextid FROM ids WHERE table_name='regexps' AND field_name='regexpid' FOR UPDATE
UPDATE ids SET nextid=7 WHERE table_name='regexps' AND field_name='regexpid'
INSERT INTO regexps (name,test_string,regexpid) VALUES ('PRUEBA','','7')
commit;


Lanzar una tx para realizar una actualización, cogiendo el id, updateandolo y usándolo para crear lo necesario:

BEGIN;
DO $$
  DECLARE
    rid INTEGER;
    eid INTEGER;
    regex integer;
    regex_name VARCHAR := 'Oracle tablespaces bisbis';

BEGIN

select regexpid into regex from regexps where name = regex_name;

if not found then
  update ids set nextid = nextid + 1 where table_name = 'regexps' returning nextid into rid;
  insert into regexps values(rid, regex_name);

  update ids set nextid = nextid + 1 where table_name = 'expressions' returning nextid into eid;
  insert into expressions values(eid, rid, 'mi expresion');

end if;

END $$;
COMMIT;



# Config
select * from config;
Parámetros de config general.



# Version del schema
select * from dbversion;

3.2 -> mandatory=3020000 optional=3020000
4.0 -> mandatory=4000000 optional=4000003

https://github.com/zabbix/zabbix/blob/trunk/src/libs/zbxdbupgrade/dbupgrade.c#L780
src/libs/zbxdbupgrade/dbupgrade.c
{DBPATCH_VERSION(2010), "2.2 development"},
{DBPATCH_VERSION(2020), "2.2 maintenance"},
{DBPATCH_VERSION(2030), "2.4 development"},
{DBPATCH_VERSION(2040), "2.4 maintenance"},
{DBPATCH_VERSION(2050), "3.0 development"},
{DBPATCH_VERSION(3000), "3.0 maintenance"},
{DBPATCH_VERSION(3010), "3.2 development"},
{DBPATCH_VERSION(3020), "3.2 maintenance"},
{DBPATCH_VERSION(3030), "3.4 development"},
{DBPATCH_VERSION(3040), "3.4 maintenance"},
{DBPATCH_VERSION(3050), "4.0 development"},
{DBPATCH_VERSION(4000), "4.0 maintenance"},



# Sacar max/min/avg de las trends

with time as (select EXTRACT(EPOCH FROM (now() - INTERVAL '24 HOUR')) as e)
select
  h.host,
  i.key_,
  COALESCE(t.value_min, tu.value_min) as min,
  COALESCE(t.value_avg, tu.value_avg) as avg,
  COALESCE(t.value_max, tu.value_max) as max,
  to_timestamp(COALESCE(t.clock, tu.clock)) as clock
from
  hosts h
  join items i using(hostid)
  left join trends t using(itemid)
  left join trends_uint tu using(itemid)
where
  h.host IN ('lel1zb01')
  AND i.key_ IN (
    'zabbix[wcache,values,float]',
    'net.tcp.service[tcp,,10051]'
  )
  AND (
    (
      t.clock is not null
      and t.clock > (select e from time)
    )
    OR (
      tu.clock is not null
      and tu.clock > (select e from time)
    )
  );


Query que realiza zabbix-web para obtener trends:
SELECT
  itemid,
  round(
    1395 * MOD(CAST(clock AS BIGINT) + 1779863, 2592000) /(2592000),
    0
  ) AS i,
  SUM(num) AS count,
  AVG(value_avg) AS avg,
  MIN(value_min) AS min,
  MAX(value_max) AS max,
  MAX(clock) AS clock
FROM
  trends_uint
WHERE
  itemid = '10715785'
  AND clock >= '1592300137'
  AND clock <= '1594892137'
GROUP BY
  itemid,
  round(
    1395 * MOD(CAST(clock AS BIGINT) + 1779863, 2592000) /(2592000),
    0
  );



# Número de triggers activos en cada nivel para una lista de hosts
WITH alarms AS (
  select
    distinct h.host,
    t.description,
    t.priority,
    count(*)
  from
    hosts h
    join items i using(hostid)
    join functions f using(itemid)
    join triggers t using(triggerid)
  where
    h.status = 0
    AND t.status = 0
    and t.value = 1
    AND h.host IN (
      'zabbix_web01',
      'zabbix_server01..notification__zbxalerter',
      'zabbix_web01..zabbix__httpd_80',
      'awx01',
      'pruebasSLA'
    )
  group by
    h.host,
    t.priority,
    t.description
)
select
  host,
  count(*) FILTER (where priority=0) as "0",
  count(*) FILTER (where priority=1) as "1",
  count(*) FILTER (where priority=2) as "2",
  count(*) FILTER (where priority=3) as "3",
  count(*) FILTER (where priority=4) as "4",
  count(*) FILTER (where priority=5) as "5"
from
  alarms
group by
  host
  ;

              host              | 0 | 1 | 2 | 3 | 4 | 5
--------------------------------+---+---+---+---+---+---
 awx01                          | 0 | 0 | 1 | 0 | 2 | 0
 pruebasSLA                     | 2 | 0 | 0 | 0 | 0 | 0
 zabbix_web01                   | 0 | 0 | 1 | 0 | 0 | 0
 zabbix_web01..zabbix__httpd_80 | 0 | 0 | 1 | 0 | 0 | 0



Itemids que están en history pero no en items-float (MUY COSTOSA!):
select distinct b.itemid from (select itemid from items where value_type=0) a full outer join history b ON a.itemid=b.itemid WHERE a.itemid IS NULL;

Itemids que están en history_uint pero no en items-int (MUY COSTOSA!):
select distinct b.itemid from (select itemid from items where value_type=3) a full outer join history_uint b ON a.itemid=b.itemid WHERE a.itemid IS NULL;

Si no ponemos distinct, tendremos el número total de entradas sin asociación con la tabla items
