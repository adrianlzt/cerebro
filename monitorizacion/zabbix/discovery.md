https://www.zabbix.com/documentation/3.4/manual/discovery/low_level_discovery
LLD: low level discovery


# Discovery en templates
Una template puede tener un discovery configurado.
Por ejemplo, para descubrir nuevos file systems y monitorizarlos.

Tendrá una "Discovery rule" y luego unos prototipos que se aplicarán a cada elemento encontrado: items, triggers, graphs

Podemos ver como ejemplo los del template de linux server para mounted file systems y netinterfaces.


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

Para definir que debe crearse automáticamente haremos uso de los "prototypes".

Podemos crear prototipos de:
 - items
 - triggers
 - graph
 - hosts

En los prototipos usaremos las macros pasadas por el script externo. {#EJEMPLO}

Si en la configuración el host vamos a sus items, veremos los autodescubiertos resaltados en rojo.

Podemos ir a la discovery rule en el host para ver si ha habido algún problema.
