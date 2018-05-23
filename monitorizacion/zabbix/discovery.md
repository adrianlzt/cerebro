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
https://www.zabbix.com/documentation/3.4/manual/discovery/low_level_discovery
LLD: low level discovery


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
  Name: CPU Usage $1
  Type: Zabbix trapper
  Key: cpu.usage[{#ID}]

Esto creará ese item asociado el host, usando la variable {#ID} en el nombre y como key al enviar el trap.
