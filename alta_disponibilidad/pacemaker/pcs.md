https://github.com/feist/pcs
Usar la ultima versión de github

https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/High_Availability_Add-On_Reference/s1-resourceopts-HAAR.html

http://clusterlabs.org/quickstart-redhat.html
http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/ch03.html

Traducción crm <-> pcs
https://github.com/ClusterLabs/pacemaker/blob/master/doc/pcs-crmsh-quick-ref.md

El usuario que tiene permisos para ejecutar pcs (a parte de root) es hacluster.
Si queremos que otros usuarios tengan permiso les agregaremos al grupo: haclient


## Desactivar STONITH:
pcs property set stonith-enabled=false

Desactivar quorum (Pacemaker’s default behavior is to stop all resources if the cluster does not have quorum):
pcs property set no-quorum-policy=ignore

Modo mantenimiento:
pcs property set maintenance-mode=true


## Nodos/Recursos/Constraints/Propiedades:
pcs config

Obtener el CIB:
pcs cluster cib FICHERO

Hacer cambios 'offline':
pcs -f drbd_cfg resource create ...

Mostrar como queda:
pcs -f drbd_cfg resource show

Push the raw xml from FICHERO to the CIB (Cluster Information Base)
pcs cluster cib-push FICHERO


Resource Agents:
  Standars: pcs resource standards
  Providers: pcs resource providers
  Lista: pcs resource agents
  Lista de ocfs: pcs resource list
    Solo redhat: pcs resource list redhat
  Descripción de un ocf: pcs resource describe ocf:redhat:mysql.sh
  Filtrar en la lista: pcs resource agents <standard>:<provider>
    Ej.: pcs resource agents ocf:redhat

Configurar un recurso:
pcs resource create VIP IPaddr2 ip=192.168.31.99 nic=eth1
pcs resource create NetCAT lsb:dummy

Modificar recurso, poner intervalo de chequeo a 10s
pcs resource update NetCAT op monitor interval=10s

Borrar recurso
pcs resource delete Crrrron

Poner constraints (orden, colocation, etc):
pcs constraint colocation add recursoHijo RecursoPadre INFINITY

Ver recursos configurados con sus opciones:
pcs resource --full
  Un recurso en particular: pcs resource show <recurso>
 
Valores por defecto para recursos y operaciones:
  pcs resource rsc defaults
  pcs resource op defaults

Limpiar recurso
pcs resource cleanup NOMBRE

Reiniciar recurso (crmsh lo hace asi https://github.com/crmsh/crmsh/blob/01e984c4d4dec2607877af627f10ad9232e34bff/modules/ui_resource.py#L272)
pcs resource meta Icinga target-role=Stopped
pcs resource meta Icinga target-role=Started



Consultar las constraint:
pcs constraint --full

Mostrar solo las location constraint:
pcs constraint location --full


## Nodos
pcs cluster standby NODO
  poner un nodo en standby

Si el nodo es DC se mantendrá, pero ya no podrá ser el activo.




## pcsd ##
yum install ruby-devel

You can also install pcsd which operates as a GUI and remote server for pcs.  To install pcsd run the following commands from the root of your pcs directory.
# cd pcsd ; make get_gems ; cd ..
# make install_pcsd

Parece que hace falta ruby1.9 por el modulo rpam-ruby19

Cambio ese por rpam a secas:
pcsd/Makefile
PCSD_GEMS=sinatra sinatra-contrib json highline rack rack-protection tilt eventmachine rack-test backports sinatra-sugar monkey-lib rpam

Da un error.

Quito la gema del Makefile. Consigo que el install funcione
La instalación es para systemd, que parece que no viene con CentOS

De todas maneras queda claro que el arranque es: ExecStart=/usr/lib/pcsd/pcsd start
Falla, pide rack: gem install rack
Nada, no la pilla


Intento instalar la gema por mi cuenta
Probar tambien con la gema pam a secas


# Constraint
pcs constraint colocation add apache with vip
  apache debe correr siempre (por defecto el score es INFINITY) con vip

pcs constraint order VIP then Icinga
  VIP debe arrancarse antes de Icinga

