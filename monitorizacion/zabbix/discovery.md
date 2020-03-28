A partir de la versión 4.2 la gestión de los LLDs se realiza de forma distinta.
Existe un proceso LLD manager que recibe las peticiones de LLD y las encola de forma parecida como los items para el procesado por los history queue.
Cada LLD rule que se crea un elemento y cada dato de ese LLD se va añadiendo en una linked list.
El manager va pasando a los LLD workers las reglas LLD a procesar, pero nunca dos iguales en paralelo.



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

Me salto un poco la parte de applications, por simplificar:

version 3.2.6
En la 3.2.8 metiron un lock al lld para evitar dos procesados simultáneos.

lld_process_discovery_rule (add or update items, triggers and graphs for discovery item) src/libs/zbxdbhigh/lld.c:526
  se le pasa un itemid y el valor JSON enviado por el cliente
  obtiene la info del item lld:
    select hostid,key_,state,evaltype,formula,error,lifetime from items where itemid=2085403
  obtiene filtros (table item_condition)
    select item_conditionid,macro,value from item_condition where itemid=2085403
  lld_rows_get, extrae info del JSON, la mete en "lld_rows"
    no se meten los datos si no pasa el filtro
  lld_update_items (add or update discovered items)
    lld_item_prototypes_get, coge los items prototypes de esta rule (relación con la tabla item_discovery)
      select i.itemid,i.name,i.key_,... from items i,item_discovery id where i.itemid=id.itemid and id.parent_itemid=2085403
    aqui se gestionan los temas de applications, varias funciones
    lld_items_get, retrieves existing items for the specified item prototypes (los devuelve en "items")
      por cada item prototype, se obtiene la lista de items "hijos", usando la tabla item_discovery
      select id.itemid,id.key_,... from item_discovery id join items i on id.itemid=i.itemid where id.parent_itemid in (2085404,2085405,2085406,2085407);
    lld_items_make, updates existing items and creates new ones based on item prototypes and lld data
      se hace un mapeo de los items, con su prototype con su "row". Solo matchea una vez, por lo que items duplicados (creados por un bug, por ejemplo) serán ignorados.
      lld_item_make, crea la estructura del item, poniendo itemid=0 (para marcar que aún no se ha creado en la db)
      lld_item_update, en el caso de que ya existiese
    lld_items_validate
      comprobar validez del nombre
      comprobar items duplicados
        si hay items nuevos, se lanza una query para ver si esas keys ya existen en el host (el not son los items que ya existian):
          select key_ from items where hostid=23240 and key_ in ('3[1]','4[1]') and not itemid in (2085872,2085874)
          en el caso de encontrar uno, se pone un error (que se mostrará en la web) y se le quita un flag, para que se ignore en lld_items_save
    CONDICIÓN de carrera, si entre el chequeo de los items y el guardado apareciese un item, se daría un error en la bd, al intentar crear un hostid,key_ que ya existe
    begin TX
    lld_items_save
      DBlock_record: select null from hosts where hostid=23240 for update
      DBget_nextid coge los ids necesarios para crear los nuevos items, tabla items y tabla item_discovery
      hace el insert de los items nuevos, tablas items e item_discovery
    lld_applications_save
    commit TX
    lld_remove_lost_items
      begin TX
      actualiza el lastcheck
        update item_discovery set lastcheck=1576061731 where itemid in (2085872,2085874,2085877,2085878);
      borra los items no descubiertos cuyo lastcheck sea más viejo del cofigurado
      commit TX
  lld_update_triggers, add or update triggers for discovered items
    obtenemos los triggers prototypes asociados a la lld rule
      select distinct t.triggerid,t.description,... from triggers t,functions f,items i,item_discovery id where ...joins... and id.parent_itemid=2085403
      lld_triggers_get, obtenemos los triggers que fueron creados por esos trigger prototypes
        select td.parent_triggerid,t.triggerid,... from triggers t,trigger_discovery td where ...joins... and td.parent_triggerid in (224228,224229,224230,224290)
      lld_functions_get, obtenemos las funciones asociadas a los triggers
        select functionid,triggerid,itemid,function,parameter from functions where (triggerid ...)
      lld_dependencies_get, obtener dependencias de los triggers
        select triggerdepid,triggerid_down,triggerid_up from trigger_depends where (triggerid_down ...)
      lld_tags_get, obtener las tags de los triggers
        select triggertagid,triggerid,tag,value from trigger_tag where (triggerid ...)
      lld_items_get, obtener la lista de items prototypes a partir de los trigger protoypes+functions
      lld_triggers_make
        lld_triggers_make, create a trigger based on lld rule and add it to the list
          lld_trigger_get, finds already existing trigger, using an item prototype and items already created by it
          si ya existe el trigger, se actualiza
          si no existe, se crea, en memoria, con triggerid=0
            por ahora parece que en la expression tiene la misma que el trigger prototype (apuntando al item prototype)
          lld_functions_make
            se recorren las funciones y se busca que itemid se debe asignar (creo que le asigna el item prototype, al menos no veo que haya recuperado los items finales)
            lld_function_make
        lld_triggers_validate
          validar los fields
          para los triggers nuevos, buscamos si ya existen en la bd
            select distinct t.triggerid,t.description,... from triggers t,functions f,items i where ...joins... and i.hostid=23240 and t.description in ('t31','t41') and not t.triggerid in (224674,224676)
          lld_functions_get, obtenemos las funciones de esos triggers que ya existen
        lld_trigger_dependencies_make
          lld_trigger_dependency_make, crea las deps en el objeto en memoria
        lld_trigger_dependencies_validate
          lld_trigger_cache_init, initializes trigger cache used to perform trigger dependency validation
        lld_trigger_tags_make
        lld_trigger_tags_validate
        lld_triggers_save, add or update triggers in database based on discovery rule
          begin
          DBlock_record, select null from hosts where hostid=23240 for update
          BUG!!! este proceso ha chequeado si los items existian y luego solicita el lock.
          Esta solicitud puede tardar segundos, o incluso minutos, si por ejemplo está el zabbix web haciendo algo pesado (cambios de templates típicamente).
          Si se reciben dos LLDs, los dos pueden quedarse bloqueados al intentar obtener el lock y los dos ya con la idea de hacer los inserts para crear los items.
          Cuando uno pueda obtener el lock hará el insert de los nuevos items, luego el siguiente intentará hacer lo mismo, dando un error en postgres: duplicate key value violates unique constraint "items_1"
          DBget_nextid, obtener ids de triggers, functions, trigger_depends y trigger_tag
          crea triggers que no existieran
            insert into triggers (triggerid,description,expression,priority,status,comments,url,type,value,...
            insert into trigger_discovery (triggerid,parent_triggerid) values (
            insert into functions (functionid,itemid,triggerid,function,parameter) values (
              parece que los itemid que usa aqui vienen dados por la función lld_update_items
              BUG! si aquel insert falló, aquí estaremos haciendo inserts con itemids que no existe, o peor, que son de cosas distintas.
          actualiza los que ya existieran:
            update ...
          commit
    ...
    lld_items_get
    ...
    lld_triggers_save


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
