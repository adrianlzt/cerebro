https://github.com/feist/pcs
Usar la ultima versión de github


http://clusterlabs.org/quickstart-redhat.html
http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/ch03.html

Traducción crm <-> pcs
https://github.com/ClusterLabs/pacemaker/blob/master/doc/pcs-crmsh-quick-ref.md


Desactivar STONITH:
pcs property set stonith-enabled=false

Desactivar quorum (Pacemaker’s default behavior is to stop all resources if the cluster does not have quorum):
pcs property set no-quorum-policy=ignore


Nodos/Recursos/Constraints/Propiedades:
pcs config

Obtener el CIB:
pcs cluster cib

Push the raw xml from <filename> to the CIB (Cluster Information Base)
pcs cluster push cib fichero


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

Poner constraints (orden, colocation, etc):
pcs constraint colocation add recursoHijo RecursoPadre INFINITY

Ver recursos configurados con sus opciones:
pcs resource --full
  Un recurso en particular: pcs resource show <recurso>
 
Valores por defecto para recursos y operaciones:
  pcs resource rsc defaults
  pcs resource op defaults




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
