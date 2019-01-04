https://www.zabbix.com/documentation/3.4/manual/api/reference/host/object#host
  En los "Object reference" podemos ver los mapeos de valores a significado
Modelo de la bbdd (version 2.x): https://zabbix.org/wiki/Database_Schemas

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


type
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

hosts - Flags
0 - normal host
2 - algo raro interno para discover de VMs? como un template de host descubierto?
4 - nodo discovered

State
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


# Queries varias
Número de items en la tabla history agrupados por buckets de 10', filtrado entre unos timestamps:
select count(*),date from history,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:30:03+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_uint,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:30:03+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_log,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:30:03+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_str,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:30:03+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;
select count(*),date from history_text,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:30:03+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;


Número de items en la tabla history_uint, type trappers, agrupados por buckets de 10' (más facil con generate_series):
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history_uint where clock > 1527379200 and clock < 1527393600 and itemid IN (select itemid from items where type=2) group by hour,min10 order by hour,min10;

Número de eventos trigger contados cada hora para un intervalo determinado:
select count(*),date_trunc('hour',to_timestamp(clock)) as hour from events where source=0 and object=0 and clock>1536745132 and clock<1536788332 group by hour order by hour;

Todos los items de un hostgroup:
select items.name,items.itemid from hosts_groups,groups,items where items.hostid=hosts_groups.hostid and hosts_groups.groupid=groups.groupid and groups.name='SOMEHOSTGROUP' limit 10;

Todos los items de un host por su hostname:
select items.name,hosts.hostid from hosts,items where hosts.name='SOMEHOSTNAME' and hosts.hostid = items.hostid;


Cuantos items de cada tipo tenemos, agrupados por activados/desactivados y poniendo su nombre en vez del type id. Ignoranmos los items de las templates:
			SELECT
                elt(type,
                  'Zabbix Agent',
                  'SNMPv1 agent',
                  'Zabbix trapper',
                  'simple check',
                  'SNMPv2 agent',
                  'Zabbix internal',
                  'SNMPv3 agent',
                  'Zabbix agent (active)',
                  'Zabbix aggregate',
                  'web item',
                  'external check',
                  'database monitor',
                  'IPMI agent',
                  'SSH agent',
                  'TELNET agent',
                  'calculated',
                  'JMX agent',
                  'SNMP trap',
                  'Dependent item'
                ) AS type,
                elt(status,
                  'ON',
                  'OFF'
                ) AS status,
                elt(state,
                  'OK',
                  'NOT SUPPORTED'
                ) AS state,
                count(*)
            FROM items,hosts
            WHERE
                items.hostid=hosts.hostid
				AND
				hosts.status <> 3
            GROUP BY type, status, state
            ORDER BY type, status DESC;



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
select hosts.name,triggers.description from functions,triggers,items,hosts where functions.triggerid=triggers.triggerid and functions.itemid=items.itemid and items.hostid=hosts.hostid and functions.function='nodata' and hosts.status=3 and items.type=2 and triggers.templateid is null order by triggers.description;

Frecuencia de inserción de items en la tabla history (una partition seleccionada). NO LANZAR EN PROD. Lanzar en una replica. Tarda varios minutos para bbdd de varios gigas (4' 60GB)
select 60*count(clock)::float/(max(clock)-min(clock)) as points_per_min,hosts.host,items.key_ from partitions.history_2018_11_26 as h,hosts,items WHERE h.itemid=items.itemid AND items.hostid=hosts.hostid AND clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '40m'))) and clock < ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '35m'))) group by h.itemid,items.key_,hosts.host HAVING (max(clock)-min(clock)) <> 0 order by points_per_min desc;


Obtener problemas de un host:
SELECT t.description ,h.host
    FROM triggers t,
         functions f,
         items i,
         problem p,
         hosts h
    WHERE p.objectid=t.triggerid
          AND p.objectid=f.triggerid
          AND f.itemid=i.itemid
          AND p.r_eventid IS NULL
          AND p.source='0'
          AND p.object='0'
          AND i.hostid = h.hostid


Tamaño de las partitions por día:
SELECT substring(relname from '20.*') as date, pg_size_pretty(sum(pg_total_relation_size(c.oid))) FROM pg_class c LEFT JOIN pg_namespace n ON n.oid = c.relnamespace WHERE relkind = 'r' and nspname = 'partitions' and relname like 'history%_' and c.reltuples <> 0 group by date order by date;


Templates que se están usando por algún host al menos:
select hostid,host from hosts where status = 3 and hostid IN (select ht.templateid from hosts_templates ht, hosts h where ht.hostid = h.hostid and h.status != 3 and flags=0);

Templates que pertenecen a un grupo:
select h.host from hosts h, hosts_groups hg, groups g where h.hostid = hg.hostid AND hg.groupid = g.groupid AND g.name = 'Templates/Metrics' limit 10;



# Tocando la bbdd
Es el frontend el que se encarga de generar elementos en la bbdd.

La incrementalidad de los IDs la lleva a cabo Zabbix, almacenando en la tabla "ids" el útimo ID generado por tabla y field.
