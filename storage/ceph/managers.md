http://docs.ceph.com/docs/master/mgr/

Otro tipo de rol dentro del cluster que vigila el estado de este.
Generalmente este rol lo llevarán los mismo nodos que sean monitores.
Funcionamiento activo-pasivo.

El mgr puede tener varios módulos de monitorización: influx, prometheus, zabbix, restful, dashboard, etc


# Plugins
## Listado de móulos activos/inactivos
ceph mgr module ls

## Activar/desactivar
ceph mgr module enable XXX

## Services
Algunos módulos exponen endpoints para mostrar sus datos
ceph mgr services

## Dashboard
http://docs.ceph.com/docs/master/mgr/dashboard/
El módulo dashboard nos expone un servidor web con una intefaz donde, gráficamente, nos muestra un resumen del cluster
Se expondrá en http://host:7000

## RESTful
http://docs.ceph.com/docs/master/mgr/restful/
RESTful plugin offers the REST API access to the status of the cluster over an SSL-secured connection.


## Desarrollo
http://docs.ceph.com/docs/master/mgr/plugins/
Podemos crear nuestro propio plugin con python

