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

State
0 - normal
1 - not supported

Flags:
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
Número de items en la tabla history agrupados por buckets de 10', filtrando entre unos timestamps:
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history where clock > 1527285600 and clock < 1527307200 group by hour,min10 order by hour,min10;

Número de items en la tabla history_uint, type trappers, agrupados por buckets de 10':
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history_uint where clock > 1527379200 and clock < 1527393600 and itemid IN (select itemid from items where type=2) group by hour,min10 order by hour,min10;

Número de eventos trigger contados cada hora para un intervalo determinado:
select count(*),date_trunc('hour',to_timestamp(clock)) as hour from events where source=0 and object=0 and clock>1536745132 and clock<1536788332 group by hour order by hour;

Todos los items de un hostgroup:
select items.name,items.itemid from hosts_groups,groups,items where items.hostid=hosts_groups.hostid and hosts_groups.groupid=groups.groupid and groups.name='SOMEHOSTGROUP' limit 10;

Todos los items de un host por su hostname:
select items.name,hosts.hostid from hosts,items where hosts.name='SOMEHOSTNAME' and hosts.hostid = items.hostid;


Cuantos items de cada tipo tenemos, agrupados por activados/desactivados y poniendo su nombre en vez del type id:
select case when type=0 then 'Zabbix Agent' when type=1 then 'SNMPv1 agent' when type=2 then 'Zabbix trapper' when type=3 then 'simple check' when type=4 then 'SNMPv2 agent' when type=5 then 'Zabbix internal' when type=6 then 'SNMPv3 agent' when type=7 then 'Zabbix agent (active)' when type=8 then 'Zabbix aggregate' when type=9 then 'web item' when type=10 then 'external check' when type=11 then 'database monitor' when type=12 then 'IPMI agent' when type=13 then 'SSH agent' when type=14 then 'TELNET agent' when type=15 then 'calculated' when type=16 then 'JMX agent' when type=17 then 'SNMP trap' when type=18 then 'Dependent item' end as type,case when status=0 then 'ON' else 'OFF' end as status,count(*) from items group by type,status order by type, status desc;

Como la anterior pero sin tener en cuenta los items de las templates:
select case when items.type=0 then 'Zabbix Agent' when items.type=1 then 'SNMPv1 agent' when items.type=2 then 'Zabbix trapper' when items.type=3 then 'simple check' when items.type=4 then 'SNMPv2 agent' when items.type=5 then 'Zabbix internal' when items.type=6 then 'SNMPv3 agent' when items.type=7 then 'Zabbix agent (active)' when items.type=8 then 'Zabbix aggregate' when items.type=9 then 'web item' when items.type=10 then 'external check' when items.type=11 then 'database monitor' when items.type=12 then 'IPMI agent' when items.type=13 then 'SSH agent' when items.type=14 then 'TELNET agent' when items.type=15 then 'calculated' when items.type=16 then 'JMX agent' when items.type=17 then 'SNMP trap' when items.type=18 then 'Dependent item' end as type,count(*) from items,hosts where items.hostid=hosts.hostid and hosts.status <> 3 group by items.type,items.status order by items.type,items.status desc;


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



Obtener problemas de un host:
SELECT e.eventid
FROM   triggers t
       INNER JOIN functions f ON ( f.triggerid = t.triggerid )
       INNER JOIN events e ON ( e.objectid = t.triggerid )
       INNER JOIN items i ON ( i.itemid = f.itemid )
WHERE  e.object = 0
       AND t.value = 1
       AND i.status = 0
       AND t.status = 0
       AND t.priority > 2
       AND e.acknowledged = 0
       AND e.eventid = (SELECT max(eventid)
                        FROM   events e
                        WHERE  e.object = 0
                               AND t.value = 1
                               AND i.status = 0
                               AND t.status = 0
                               AND e.objectid = t.triggerid
                               AND i.hostid=10115);


# Tocando la bbdd
Es el frontend el que se encarga de generar elementos en la bbdd.

La incrementalidad de los IDs la lleva a cabo Zabbix, almacenando en la tabla "ids" el útimo ID generado por tabla y field.
