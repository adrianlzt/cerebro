# Network discovery
https://www.zabbix.com/documentation/3.4/manual/discovery

Se puede crear una regla que cuando encuentre nuevos equipos los de de alta automáticamente.
Parece que no se puede que esos nuevos equipos la interfaz se marque para no usar la DNS

Para no dar de alta varios hosts por tener varias IPs, descubrimos por zabbix agent con key "system.hostname" y ponemos ese item como "Device uniqueness criteria"

En "Administration - General - Other" ponemos a que grupo van los hosts descubiertos, quien los puede ver, a quien notificar, etc.

En Monitoring - Discover podemos ver lo que se ha descubierto.

El discovery genera events de tipo disovery.
Deberemos reaccionar a esos eventos para agregar los hosts, o enviar un mensaje, habilitarlo/deshabilitardo, etc.
Configuration - Action - Discovery - Event Source: Discovery

El proceso "discover" puede encontrarse saturado si tenemos pocos y tiene que chequear muchas IPs (StartDiscoverers)


# LLD
https://www.zabbix.com/documentation/current/manual/discovery/low_level_discovery
LLD: low level discovery

Item prototypes, los nombre deben usar las macros que se usan en la key. A partir de la 4.0 ya no se puede usar $1,$2,etc.
Antes: item name eg.: Free disk space on $1
Ahora: item name eg.: Free disk space on {#FSNAME}


# Discovery en templates
Una template puede tener un discovery configurado.
Por ejemplo, para descubrir nuevos file systems y monitorizarlos.

Tendrá una "Discovery rule" y luego unos prototipos que se aplicarán a cada elemento encontrado: items, triggers, graphs

Podemos ver como ejemplo los del template de linux server para mounted file systems y netinterfaces.


# Discovery snmp
mirar snmp.md


# Discovery sql
https://www.zabbix.com/documentation/3.4/manual/discovery/low_level_discovery/sql_queries

Una query sql para otener elementos a partir de los que generar items.

Column names become macro names and selected rows
become the values of these macros
Use column aliases to define macro names:
mysql> SELECT c.name, c.loc AS location FROM customers c;

Be aware: the discovery rule becomes not supported if
macro name is not valid



# Discovery files
https://support.zabbix.com/browse/ZBXNEXT-712
Issue reclamando un autodiscover para ficheros en un directorio



# Custom autodiscover
Un esquema típico sería crear una template con un autodiscover.
En el autodiscover configuramos para usar un external script (mirar items.md). La key será el nombre del script: openshift.sh["param1","param2"]
Este script debe devolver un JSON tipo:
{
    "data": [
        {
            "{#IP}": "10.0.0.1",
            "{#SERVICE}": "nombre1"
        },
        {
            "{#IP}": "10.0.0.2",
            "{#SERVICE}": "nombre2"
        }
    ]
}

Ejemplo con zabbix_sender
zabbix_sender -z 172.17.0.3 -s aaahost -k grafana_bug -o '{"data":[{"{#UNO}":"uno","{#DOS}":"dos","{#TRES}":"tres"}]}'

Cuando un host implemente este template automáticamente aparecerán los items que descubra el script.

También podemos usar un trap para generar el LDD.
Cuando creamos la "Discovery rule" ponemos "Type: Zabbix trapper" y una key.
Luego tenemos que enviar el JSON como si fuese un envío de una métrica a esa key. Ejemplo:
  NewMetric("AdriTestHostLDD", "adri.test.telegraf", "{\"data\":[{\"{#ID}\":\"AA\"}]}")

Para definir que debe crearse automáticamente haremos uso de los "prototypes".

Podemos crear prototipos de:
 - items
 - triggers
 - graph
 - hosts

En los prototipos usaremos las macros pasadas por el script externo. {#EJEMPLO}
Creo que es obligatorio usar en el nombre alguna de las variables, para que no se creen items duplicados.

Si en la configuración el host vamos a sus items, veremos los autodescubiertos resaltados en rojo.

Podemos ir a la discovery rule en el host para ver si ha habido algún problema.

Ejemplo, para un host que implementa un template, tenemos un LDD que crea item prototypes.
  Name: CPU Usage {#ID}
  Type: Zabbix trapper
  Key: cpu.usage[{#ID}]

Esto creará ese item asociado el host, usando la variable {#ID} en el nombre y como key al enviar el trap.



## LLD con database odbc
https://www.zabbix.com/documentation/3.4/manual/discovery/low_level_discovery/sql_queries
Las columnas pasarán a ser macros con su nombre en mayúsculas.
Mejor usar un "as xxx" en la query para poner un nombre simple que sea fácilmente convertible a macro, si no, mirar los logs de debug para ver que nombre se le ha dado.


## Custom discovery para procesos
https://github.com/q1x/zabbix-templates/tree/master/process-discovery

UserParameter=ps.discovery,echo "{\n \"data\":[" ; /bin/ps --no-headers caux | /usr/bin/awk '{ print " { \"{#PSUSER}\":\"" $1 "\", \"{#PSNAME}\":\"" $11 "\" },"}' | /usr/bin/sort | /usr/bin/uniq | /bin/sed -e 's/\//\\\//g' -e '$s/.$//' ; echo " ]\n}"

Este user paameter nos devuelve un JSON tipo:
{\n "data":[
 { "{#PSUSER}":"102", "{#PSNAME}":"zabbix_agentd" },
 { "{#PSUSER}":"104", "{#PSNAME}":"bcron-sched" },
 { "{#PSUSER}":"104", "{#PSNAME}":"unixserver" },
 { "{#PSUSER}":"dbus", "{#PSNAME}":"dbus-daemon" },
 ]}


Podemos usar esta discovery luego con filters para crear solo los procesos que necesitemos.


Discovery de procesos ora_pmon* (oracle) para AIX:
echo '{ "data":['; ps -eo args | grep "^ora_pmon" | /usr/bin/awk '{ print " { \"{#PSNAME}\":\"" $1 "\" },"}' | /usr/bin/sort | /usr/bin/uniq | /bin/sed '$s/.$//' ; echo "]}"


Si luego nos llama para obtener valores de item prototypes (en $1 tendremos el valor entre corchetes):
UserParameter=custom.vfs.dev.read.ops[*],awk '{print $$1}' /sys/class/block/$1/stat



# Internal
En procesos_internos.md hay detalle de como se procesan los datos

Parece que los servicios que pueden llamar a dc_add_history son:
 pinger
 poller
 snmptrapper
 proxy (por aqui entran los active agents y pollers. Es como un proxy interno de zabbix server)


dc_add_history (add new value to the cache)
src/libs/zbxdbcache/dbcache.c:2700
Si en los items flags esta marcado que es un lld llama a lld_process_discovery_rule.
  Si en un mismo trap enviamos varios LLD, veremos (dentro del mismo recv_agenthistory) varios "In lld_process_discovery_rule" y "End of lld_process_discovery_rule"
Si es un proxy lo almacena (supongo que para luego enviarlo al server)

lld_process_discovery_rule (add or update items, triggers and graphs for discovery item)
src/libs/zbxdbhigh/lld.c:526

src/libs/zbxdbhigh/lld.c:598
lld_update_items(hostid, lld_ruleid, &lld_rows, &error, lifetime, now)


src/libs/zbxdbhigh/lld_item.c:3255
lld_update_items (add or update discovered items)


## LLD enabled
LLD recibido con un trapper
https://gist.github.com/adrianlzt/95fba65b9e17ce8a931579b0742e9468


## LLD disabled
En caso de que un LLD esté desactivado, si enviamos un trap con zabbix_sender veremos como nos contesta con "failed: 1".
El los debug que veremos:
  2251:20181121:082444.476 __zbx_zbx_setproctitle() title:'trapper #5 [processing data]'
  2251:20181121:082444.476 trapper got '{"request":"sender data","data":[{"host":"test_lld","key":"somelld","value":"{\"data\":[{\"{#FOO}\":\"11_dis\"}]}"}]}'
  2251:20181121:082444.477 In recv_agenthistory()
  2251:20181121:082444.477 In process_hist_data()
  2251:20181121:082444.477 In process_mass_data()
  2251:20181121:082444.477 End of process_mass_data()
  2251:20181121:082444.477 End of process_hist_data():SUCCEED
  2251:20181121:082444.477 In zbx_send_response()
  2251:20181121:082444.477 zbx_send_response() '{"response":"success","info":"processed: 0; failed: 1; total: 1; seconds spent: 0.000173"}'
  2251:20181121:082444.477 End of zbx_send_response():SUCCEED
  2251:20181121:082444.477 End of recv_agenthistory()
  2251:20181121:082444.478 __zbx_zbx_setproctitle() title:'trapper #5 [processed data in 0.001342 sec, waiting for connection]'
