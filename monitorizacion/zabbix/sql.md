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


# History
El histórico de los datos se almacena en tablas según su tipo:
double/float -> history
char         -> history_str
log          -> history_log
uint         -> history_uint
text         -> history_text

Si usamos ElasticSearch, estas tablas se almacenan en ES en vez de la SQL.


Número de items en la tabla history agrupados por buckets de 10':
select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as min10 from history where clock > 1527285600 and clock < 1527307200 group by hour,min10 order by hour,min10;
