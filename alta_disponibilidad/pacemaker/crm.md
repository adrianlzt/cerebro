Herramienta para configurar el cluster y administrarlo.
La sacan fuera de pacemaker: https://savannah.nongnu.org/projects/crmsh/

Mostrar configuracion:
crm configure show
crm -D plain configure show (en texto plano)

Editar configuración:
# crm
crm(live)# configure
crm(live)configure# edit

Otra opción:
crm(live)configure# primitive vip_ ... 

Backup de la configuracion (en CIB):
crm configure save _BACKUP_PATH_

Restaurar (en CIB):
crm configure load replace _BACKUP_PATH


Backup en XML:
cibadmin -Q > _BACKUP_PATH_

Restaurar de un XML:
cibadmin --replace --xml-file _BACKUP_PATH_



Mostrar el estado del cluster y los servicios:
# crm_mon
Teclas que nos dan mas info:
  f - migration summary
  c - tikets
  o - operations
  t - time-stamp en las operations
  r - inactive resources
  A - note attributes
  n - info nodos
  L - fencinf contraints


Lo mismo, mas informacion sobre migraciones:
crm_mon --failcounts

Con toda la información:
crm_mon -fotrA


# crm ra
Mirar las clases de resources disponibles:
crm(live)ra# classes

crm(live)ra# list <clase>
crm(live)ra# list ocf

OCF a su vez tiene 3 sublistas (pacemaker, heartbeat y redhat) [redhat en el caso de ser redhat, claro]
crm(live)ra# list ocf pacemaker

Para ver las posibles configuraciones
crm(live)ra# meta nombrescript


Resources:
crm(live)# resource
crm(live)resource# status
Desde aquí podemos manejarlos: start, stop, restart, ... 
Migrar un resource a otra máquina (mete una regla en el fichero de configuración, por lo que cuando migremos de nuevo, no volverá a funcionar el comando. Lo suyo es poner al migrate un lifetime, para que borre la linea de la configuración)
crm(live)resource# migrate resource-name node-name PT2M  (la regla será valida durante dos minutos: http://en.wikipedia.org/wiki/ISO_8601#Duration)
crm(live)resource# restart resource

crm(live)resource# move resource node
Mueve un recurso manualmente. Creará una regla de location cli-prefer-ResourceName
crm(live)resource# unmove
Devuelve el control al cluster

Node:
crm(live)# nodes
Administracion de nodos: show, status


Para salir del menu al anterior:
crm(xxx)nn# end
