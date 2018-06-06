Modelo de la bbdd: https://zabbix.org/wiki/Database_Schemas

Accediendo directamente a la base de datos de zabbix.

Tabla items
Descripción e id de todos los items.
Generalmente podemos acceder fácilmente a través de: key_
itemid es el valor que usaremos para buscar el item en otras tablas.

Buscar por una key:
select itemid,name,key_,value_type from items where key_ like '%Beta%';


value_type
El tipo de dato que almacena el item:
 0 -> double/float
 1 -> char
 2 -> log
 3 -> uint
 4 -> text


# History
El histórico de los datos se almacena en tablas según su tipo:
double/float -> history
char         -> history_str
log          -> history_log
uint         -> history_uint
text         -> history_text
