RHEL debe usar CMAN en vez de Corosyc (al menos hasta que salga RH7)

http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Clusters_from_Scratch/_adding_cman_support.html

http://floriancrouzat.net/2013/04/rhel-6-4-pacemaker-1-1-8-adding-cman-support-and-getting-rid-of-the-plugin/

http://clusterlabs.org/quickstart-redhat.html

FAQ: https://fedorahosted.org/cluster/wiki/FAQ/CMAN


yum install cman ccs pacemaker

Primero metemos en el /etc/hosts las interfaces para los dos anillos que crearemos (importante tener redundancia)
vim /etc/hosts
> 192.168.1.1 node01.example.com
> 192.168.100.1 node01_alt.example.com
> 192.168.2.1 node02.example.com
> 192.168.200.1 node02_alt.example.com

Generamos el fichero /etc/cluster/cluster.conf con ccs
ccs allows an administrator to create, modify and view a cluster configuration file on a remote node through ricci or on a local file system. Using ccs an administrator can also start and stop the cluster services on one or all of the nodes in a configured cluster.

Esto lo debemos generar en los nodos, o despues copiar el fichero cluster.conf entre los nodos.

# Define the cluster
ccs -f /etc/cluster/cluster.conf --createcluster pacemaker1

# Create redundant rings
ccs -f /etc/cluster/cluster.conf --addnode node01.example.com
ccs -f /etc/cluster/cluster.conf --addalt node01.example.com node01_alt.example.com
ccs -f /etc/cluster/cluster.conf --addnode node02.example.com
ccs -f /etc/cluster/cluster.conf --addalt node02.example.com node02_alt.example.com

# Delegate fencing to pacemaker http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Clusters_from_Scratch/_configuring_cman_fencing.html
# Dejamos que sea pacemaker el que se encargue del fencing. Util para que el resto de recursos sepa del fencing y pueda actuar en consecuencia
ccs -f /etc/cluster/cluster.conf --addmethod pcmk-redirect node01.example.com
ccs -f /etc/cluster/cluster.conf --addmethod pcmk-redirect node02.example.com
ccs -f /etc/cluster/cluster.conf --addfencedev pcmk agent=fence_pcmk
ccs -f /etc/cluster/cluster.conf --addfenceinst pcmk node01.example.com pcmk-redirect port=node01.example.com
ccs -f /etc/cluster/cluster.conf --addfenceinst pcmk node02.example.com pcmk-redirect port=node02.example.com

# Encrypt rings and define port (important to stick with default port if SELinux=enforcing)
ccs -f /etc/cluster/cluster.conf --setcman keyfile="/etc/corosync/authkey" transport="udpu" port="5405"
corosync-keygen
# Para generar entropia: 
tar zx / > /dev/null
find . -exec file {} \; > /dev/null

# Copiamos la clave al otro nodo
scp /etc/corosync/authkey nodoN:/etc/corosync/authkey

# Finally, choose your favorite rrp_mode
# It’s pretty easy to setup. RRP supports various mode of operation:
#  Active: both rings will be active, in use
#  Passive: only one of the N ring is in use, the second one will be use only if the first one fails
ccs -f /etc/cluster/cluster.conf --settotem rrp_mode="passive" 

Toda esta configuracion la he dejado en el fichero cluster.conf-basic

# Comprobamos la configuración
ccs_config_validate -f /etc/cluster/cluster.conf

En este momento, si no estabamos ejecutando los comandos en los dos nodos, copiaremos el fichero /etc/cluster/cluster.conf al otro nodo.

Algunas configuraciones importantes:
/etc/sysconfig/cman:
MAN_QUORUM_TIMEOUT=0 # Deberemos quitar la necesidad de quorum si es un cluster de dos nodos
CONFIG_VALIDATION=FAIL # Tambien seremos estrictos con la configuración
INITLOGLEVEL=full # Mucho log en el script de inicio
NODENAME # definir el nombre de este nodo, si no, lo pilla automaticamente. Deberá poder resolverse o estar en el /etc/hosts


# Configuramos CMAN para arrancar al inicio y lo arrancamos
chkconfig cman on
service cman start

# Check the rings
corosync-objctl | fgrep members
# Check secauth, rrp_mode, transport etc.
corosync-objctl | egrep ^totem
corosync-cfgtool -s
cman_tool status
cman_tool nodes

Seguir con instalacion de pacemaker: instalacion-pacemaker.md
Ahora quedaría configurar pacemaker, que lo haremos con pcs (crm esta deprecated, al menos en RHEL) -> pcs.md

