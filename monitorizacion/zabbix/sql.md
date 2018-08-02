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

Flags:
0 - a plain item
1 - items lld discovery
2 - item prototype de un host
3 - sin uso?
4 - a discovered item


# History
El histórico de los datos se almacena en tablas según su tipo:
double/float -> history
char         -> history_str
log          -> history_log
uint         -> history_uint
text         -> history_text

Si usamos ElasticSearch, estas tablas se almacenan en ES en vez de la SQL.


# Queries varias
Número de items en la tabla history agrupados por buckets de 10':
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history where clock > 1527285600 and clock < 1527307200 group by hour,min10 order by hour,min10;

Número de items en la tabla history_uint, type trappers, agrupados por buckets de 10':
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history_uint where clock > 1527379200 and clock < 1527393600 and itemid IN (select itemid from items where type=2) group by hour,min10 order by hour,min10;

Todos los items de un hostgroup:
select items.name,items.itemid from hosts_groups,groups,items where items.hostid=hosts_groups.hostid and hosts_groups.groupid=groups.groupid and groups.name='SOMEHOSTGROUP' limit 10;

Todos los items de un host por su hostname:
select items.name,hosts.hostid from hosts,items where hosts.name='SOMEHOSTNAME' and hosts.hostid = items.hostid;

Cuantos items de cada tipo tenemos:
select type,count(*) from items group by type order by type;

Número de items enabled por hostgroup:
select g.name,count(*) from hosts as h, items as i, hosts_groups, groups as g where i.hostid=h.hostid and h.hostid=hosts_groups.hostid and hosts_groups.groupid=g.groupid and g.name <> 'Templates' and i.status=0 group by g.name limit 10;

Top 10 de hostgroups por número de items pasivos (enabled):
select g.name,count(*) from hosts as h, items as i, hosts_groups, groups as g where i.hostid=h.hostid and h.hostid=hosts_groups.hostid and hosts_groups.groupid=g.groupid and g.name <> 'Templates' and i.type=0 and i.status=0 group by g.name order by count desc limit 10;
