http://docs.ceph.com/docs/master/mgr/

Otro tipo de rol dentro del cluster que vigila el estado de este.
Generalmente este rol lo llevarán los mismo nodos que sean monitores.
Funcionamiento activo-pasivo.

El mgr puede tener varios módulos de monitorización: influx, prometheus, zabbix, restful, dashboard, etc


# Plugins
## Listado de móulos activos/inactivos
ceph mgr module ls

Opciones de configuración de esos módulos:
ceph config ls
Ejemplo modificación:
ceph config-key set config/mgr/mgr/dashboard/server_addr 10.0.2.210
ceph zabbix config-set zabbix_host SERVERZABBIX


## Activar/desactivar, en el cluster
ceph mgr module enable XXX

## Services
Algunos módulos exponen endpoints para mostrar sus datos
ceph mgr services

## Dashboard
http://docs.ceph.com/docs/master/mgr/dashboard/
El módulo dashboard nos expone un servidor web con una intefaz donde, gráficamente, nos muestra un resumen del cluster
Se expondrá en http://host:7000
ceph mgr module enable dashboard
Modificar la IP, por si está apuntando a localhost
ceph config-key set config/mgr/mgr/dashboard/server_addr 10.0.2.20
Recargar para que tenga efecto:
ceph mgr module disable dashboard
ceph mgr module enable dashboard

Más info: https://access.redhat.com/solutions/5215611

Solo el nodo manager activo mostrará el dashboard, el resto harán redirecciones.
Tal vez poner en el server_addr la ip de dominio que llegue a un balanceador y ese sepa a donde redirigir?
Para eso tendrá que descartar los redirect.
Parece que en versiones modernas se puede especificar que no haga redirect: https://people.redhat.com/bhubbard/nature/default/mgr/dashboard/

## RESTful
http://docs.ceph.com/docs/master/mgr/restful/
RESTful plugin offers the REST API access to the status of the cluster over an SSL-secured connection.


## Desarrollo
http://docs.ceph.com/docs/master/mgr/plugins/
Podemos crear nuestro propio plugin con python



# Zabbix
http://docs.ceph.com/docs/master/mgr/zabbix/

Hace uso del zabbix_sender para enviar métricas a un servidor de Zabbix.
Tenemos que meter la template que está en la web y configurarla para los hosts: https://raw.githubusercontent.com/ceph/ceph/master/src/pybind/mgr/zabbix/zabbix_template.xml

Donde corra el mgr tiene que estar instalado el zabbix_sender
No viene en los container ceph-mgr-xxx
yum install -y zabbix40
docker exec -it ceph-mgr-$(hostname) yum install -y zabbix40

Tendremos un host de zabbix por cluster de ceph.
La config de zabbix se comparte entre todos los nodos del cluster.

Activar el módulo
ceph mgr module enable zabbix

Configuramos el server de zabbix
ceph zabbix config-set zabbix_host SERVERZABBIX

Configuramos el host de Zabbix a donde enviar las métrica:
ceph zabbix config-set identifier NOMBREHOST

Chequeamos conf:
ceph zabbix config-show
