Mejor no usar Vagrant, porque es un poco caos la configuración de red.

A cada nodo le metemos dos interfaces una NAT (aunque creo que no sería necesaria) y una conectada a la red interna intnet.
Mi portatil puede conectarse a dicha red interna, asi que no tenemos necesidad de una ip externa.
Pero mejor dejamos una eth2 para poder seguir la configuración del manual de instalación.


http://docs.openstack.org/grizzly/basic-install/apt/content/

#### Controller Node ####
The Controller node will provide :
Databases (with MySQL)
Queues (with RabbitMQ)
Keystone
Glance
Nova (without nova-compute)
Cinder
Quantum Server (with Open-vSwitch plugin)
Dashboard (with Horizon)

apt-get install ubuntu-cloud-keyring

vi /etc/apt/sources.list.d/cloud-archive.list
deb http://ubuntu-cloud.archive.canonical.com/ubuntu precise-updates/grizzly main

 sudo apt-get update && apt-get upgrade

 vi /etc/apt/sources.list.d/grizzly.list
 deb http://archive.gplhost.com/debian grizzly main
 deb http://archive.gplhost.com/debian grizzly-backports main

apt-get update
apt-get install gplhost-archive-keyring
apt-get upgrade


Editar /etc/network/interfaces para tener la interna y la externa
Para mi la externa será: 192.168.1.46/24 eth2
Y la interna: 10.10.10.10/24 eth1

Poner estas conf en el fichero para fijarlas ante reinicios
service networking restart

vi /etc/sysctl.conf
net.ipv4.conf.all.rp_filter = 0
net.ipv4.conf.default.rp_filter = 0

sysctl -e -p /etc/sysctl.conf


vi /etc/hosts
10.10.10.10     cloud
10.10.10.9      network
10.10.10.11     c01


Install NTP. NTP will ensure that the server has the correct time. This is important because if an OpenStack server's time is not correct, it will be removed from the rest of the cloud.'
# apt-get install -y ntp


apt-get install -y python-mysqldb mysql-server
Nos va a pedir password para el root (3 veces me lo ha pedido)

Que MySQL escuche en todos los puertos:
This needs changed so that the compute nodes can access the OpenStack Networking service. Database requests for the OpenStack Compute service are proxied through the nova-conductor service.
sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/my.cnf
service mysql restart

Usuarios:
mysql -u root -p <<EOF
CREATE DATABASE nova;
GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' \
IDENTIFIED BY 'password';
CREATE DATABASE cinder;
GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' \
IDENTIFIED BY 'password';
CREATE DATABASE glance;
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' \
IDENTIFIED BY 'password';
CREATE DATABASE keystone;
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' \
IDENTIFIED BY 'password';
CREATE DATABASE quantum;
GRANT ALL PRIVILEGES ON quantum.* TO 'quantum'@'localhost' \
IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON quantum.* TO 'quantum'@'10.10.10.9' \
IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON quantum.* TO 'quantum'@'10.10.10.11' \
IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
EOF



apt-get install -y rabbitmq-server
rabbitmqctl change_password guest password


Hizo falta un apt-get update, si no, decía que no encontraba ciertos paquetes.
apt-get update
apt-get install -y keystone python-keystone python-keystoneclient
vi /etc/keystone/keystone.conf
[DEFAULT]
admin_token = password
debug = True
verbose = True
[sql]
#connection = sqlite:////var/lib/keystone/keystone.db
connection = mysql://keystone:password@localhost/keystone

service keystone restart
keystone-manage db_sync


Definimos las variables para que losusuarios se puedan conectar a openstack. Lo hago para el usuario root:
vi ~/openrc
export OS_TENANT_NAME=admin
export OS_USERNAME=admin
export OS_PASSWORD=password
export OS_AUTH_URL="http://localhost:5000/v2.0/"
export OS_SERVICE_ENDPOINT="http://localhost:35357/v2.0"
export OS_SERVICE_TOKEN=password

source ~/openrc

Best practice for bootstrapping the first administrative user is to use the OS_SERVICE_ENDPOINT and OS_SERVICE_TOKEN together as environment variables, then set up a separate RC file just for Identity administration that uses port 35357 for the OS_AUTH_URL. This example is meant to provide a quick setup, not an audit-able environment

Cargar estas credenciales al entrar en la cuenta:
echo "source ~/openrc" >> ~/.bashrc

The following bash script will populate Keystone with some initial data:
  Projects: admin and services
  Roles: admin, Member
  Users: admin, demo, nova, glance, quantum, and cinder
  Services: compute, volume, image, identity, ec2, and network
vi populate-data-keystone.sh
chmod a+x populate-data-keystone.sh
./populate-data-keystone.sh


Instalar gestor de imágenes (Glance):
apt-get install -y glance

Configuramos glance-api:
vi /etc/glance/glance-api.conf
[DEFAULT]
sql_connection = mysql://glance:password@localhost/glance
[keystone_authtoken]
admin_tenant_name = service
admin_user = glance
admin_password = password
[paste_deploy]
flavor=keystone 

Configuramos glance-registry:
vi /etc/glance/glance-registry.con
[DEFAULT]
sql_connection = mysql://glance:password@localhost/glance
[keystone_authtoken]
admin_tenant_name = service
admin_user = glance
admin_password = password
[paste_deploy]
flavor=keystone 


Reiniciamos ambos servicios:
service glance-api restart && service glance-registry restart

Buscamos posibles errores:
/var/log/glance/registry.log
/var/log/glance/api.log

Creamos estructura en la base de datos:
glance-manage db_sync

Bajamos una Ubuntu Cloud Image (ubuntu preparada para correr sobre amazon,openstack,lxc,etc) y la metemos en glance:
http://uec-images.ubuntu.com/releases/12.04.3/release/ubuntu-12.04-server-cloudimg-amd64-disk1.img
glance image-create --is-public true --disk-format qcow2 --container-format bare --name "Ubuntu" < ubuntu-12.04-server-cloudimg-amd64-disk1.img

Bajamos CirrOS y lo metemos en Glance:
wget http://download.cirros-cloud.net/0.3.1/cirros-0.3.1-x86_64-disk.img
glance image-create --is-public true --disk-format qcow2 --container-format bare --name "CirrOS 0.3.1" < cirros-0.3.1-x86_64-disk.img


Listar imágenes:
glance image-list


Instalamos el control de computación:
apt-get install -y nova-api nova-cert nova-common nova-conductor nova-scheduler python-nova python-novaclient nova-consoleauth 
wget http://archive.ubuntu.com/ubuntu/pool/universe/libj/libjs-swfobject/libjs-swfobject_2.2+dfsg-1_all.deb
dpkg -i libjs-swfobject_2.2+dfsg-1_all.deb
apt-get install -y novnc nova-novncproxy

vi /etc/nova/api-paste.ini
  admin_tenant_name = service
  admin_user = nova
  admin_password = password

vi /etc/nova/nova.conf (dejar lo que estuviese como esté)
  [DEFAULT]

  sql_connection=mysql://nova:password@localhost/nova
  my_ip=10.10.10.10
  rabbit_password=password
  auth_strategy=keystone

  # Networking
  network_api_class=nova.network.quantumv2.api.API
  quantum_url=http://10.10.10.10:9696
  quantum_auth_strategy=keystone
  quantum_admin_tenant_name=service
  quantum_admin_username=quantum
  quantum_admin_password=password
  quantum_admin_auth_url=http://10.10.10.10:35357/v2.0
  libvirt_vif_driver=nova.virt.libvirt.vif.LibvirtHybridOVSBridgeDriver
  linuxnet_interface_driver=nova.network.linux_net.LinuxOVSInterfaceDriver  

  # Security Groups                                    
  firewall_driver=nova.virt.firewall.NoopFirewallDriver
  security_group_api=quantum                           
                                                       
   # Metadata                                           
   quantum_metadata_proxy_shared_secret=password          
   service_quantum_metadata_proxy=true                  
   metadata_listen = 10.10.10.10        
   metadata_listen_port = 8775                          

   # Cinder
   volume_api_class=nova.volume.cinder.API

   # Glance
   glance_api_servers=10.10.10.10:9292
   image_service=nova.image.glance.GlanceImageService

   # novnc
   novnc_enable=true             
   novncproxy_port=6080          
   novncproxy_host=10.0.0.10
   vncserver_listen=0.0.0.0


Create Nova tables into the database:
  nova-manage db sync


Restart Nova services:

  service nova-api restart
  service nova-cert restart
  service nova-consoleauth restart
  service nova-scheduler restart
  service nova-novncproxy restart
  service nova-conductor restart (este no lo pone el manual)

Comprobar que todos los servicios conectan correctamente al rabbit
/var/log/nova/nova-*
  ...Connected to AMQP server on localhost:5672



Instalamos el Block Storage
apt-get install libibverbs1
wget http://archive.ubuntu.com/ubuntu/pool/main/libr/librdmacm/librdmacm1_1.0.15-1_amd64.deb
dpkg -i librdmacm1_1.0.15-1_amd64.deb
apt-get install -y cinder-api cinder-scheduler cinder-volume iscsitarget open-iscsi iscsitarget-dkms python-cinderclient linux-headers-`uname -r`

Configure & start the iSCSI services:

sed -i 's/false/true/g' /etc/default/iscsitarget
service iscsitarget start
service open-iscsi start

vi /etc/cinder/cinder.conf
  [DEFAULT]
  sql_connection = mysql://cinder:password@localhost/cinder
  rabbit_password = password

vi /etc/cinder/api-paste.ini
  admin_tenant_name = service
  admin_user = cinder 
  admin_password = password


Desde la interfaz gráfica de virtualbox añado un disco extra a la máquina.
Me lo crea en /dev/sdb
Sigo la guía:

  pvcreate /dev/sdb
  vgcreate cinder-volumes /dev/sdb

Create Cinder tables into the database:
  cinder-manage db sync


service cinder-api restart
service cinder-scheduler restart
service cinder-volume restart


Instalamos la parte network:
apt-get install -y quantum-server


vi /etc/quantum/quantum.conf
  [DEFAULT]
  verbose = True
  rabbit_password = password
  [keystone_authtoken]
  admin_tenant_name = service
  admin_user = quantum 
  admin_password = password

vi /etc/quantum/plugins/openvswitch/ovs_quantum_plugin.ini
  [DATABASE]
  sql_connection = mysql://quantum:password@localhost/quantum
  [OVS]
  tenant_network_type = gre 
  tunnel_id_ranges = 1:1000
  enable_tunneling = True
  local_ip = 10.10.10.10
  [SECURITYGROUP]
  firewall_driver = quantum.agent.linux.iptables_firewall.OVSHybridIptablesFirewallDriver

Enable the OVS plugin:
  ln -s /etc/quantum/plugins/openvswitch/ovs_quantum_plugin.ini /etc/quantum/plugin.ini

Start the services:
  service quantum-server restart



Instalamos el web interface - Horizon
apt-get install -y openstack-dashboard memcached python-memcache

Borramos el theme de ubuntu que muestra mal ciertas cosas:
apt-get remove --purge openstack-dashboard-ubuntu-theme

http://192.168.1.46/horizon
admin/password
demo/password

Si hay errores con el dashboard mirar en /var/log/apache2/error.log



#### Network Node ####
The Network node will provide:
Virtual Bridging (Open-vSwitch + Quantum Agent) with tunneling
DHCP Server (Quantum DHCP Agent)
Virtual Routing (Quantum L3 Agent)

Comunes a todos los nodos:
apt-get install ubuntu-cloud-keyring
echo "deb http://ubuntu-cloud.archive.canonical.com/ubuntu precise-updates/grizzly main" > /etc/apt/sources.list.d/cloud-archive.list
sudo apt-get update && apt-get upgrade

vi /etc/apt/sources.list.d/grizzly.list
  deb http://archive.gplhost.com/debian grizzly main
  deb http://archive.gplhost.com/debian grizzly-backports main


apt-get update
apt-get install gplhost-archive-keyring
apt-get update
apt-get upgrade -y


vi /etc/sysctl.conf
  net.ipv4.ip_forward = 1
  net.ipv4.conf.all.forwarding = 1
  net.ipv4.conf.all.rp_filter = 0
  net.ipv4.conf.default.rp_filter = 0
  
service networking restart (si hemos modificado la conf de red. Aqui no lo pongo porque no cambio nada. Pone las ips de eth0 y eth1, y dns y gateway a la eth1)
sysctl -e -p /etc/sysctl.conf


vi /etc/hosts
  10.10.10.10     cloud
  10.10.10.9      network
  10.10.10.11     c01


apt-get install -y ntp

Open vSwitch
apt-get install -y quantum-plugin-openvswitch-agent quantum-dhcp-agent quantum-l3-agent


Check the settings in /etc/quantum/rootwrap.conf to ensure the sudoers file matches the settings for root_helper in /etc/quantum/quantum.conf.
Me ha creado el fichero /etc/sudoers.d/quantum_sudoers con:
Defaults:quantum !requiretty
quantum ALL = (root) NOPASSWD: /usr/bin/quantum-rootwrap

service openvswitch-switch start
 * Inserting openvswitch module
 Module has probably not been built for this kernel.
 Install the openvswitch-datapath-source package, then read
 /usr/share/doc/openvswitch-datapath-source/README.Debian
  * Inserting openvswitch module

Parece que es un bug del paquete openvswitch https://bugs.launchpad.net/ubuntu/+source/openvswitch/+bug/1021078
Workaround: http://umairhoodbhoy.net/2013/01/29/handling-kernel-updates-with-open-vswitch/
  apt-get install module-assistant
  module-assistant auto-install openvswitch-datapath
  service openvswitch-switch start

Create an internal and external network bridge.
  ovs-vsctl add-br br-ex
  ovs-vsctl add-port br-ex eth1
  ovs-vsctl add-br br-int

Meto al final de /etc/network/interfaces (esperando que al haber duplicidad con la conf de vagrant, haga caso a la ultima)
En el manual usan eth1 como la interfaz externa. En mi caso es eth2, y es la ip 192.168.1.47/24 asignada por DHCP por el router.
  auto eth2
  iface eth2 inet manual
      up ip address add 0/0 dev $IFACE
      up ip link set $IFACE up
      down ip link set $IFACE down
  
  auto br-ex
  iface br-ex inet static
      address 192.168.1.109
      netmask 255.255.255.0
      gateway 192.168.1.1


Remove the IP address from eth2 add it to br-ex, as follows:
  ip addr del 192.168.1.47/24 dev eth2
  ip addr add 192.168.1.109/24 dev br-ex

Queda:
4: eth2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 08:00:27:a5:4c:a9 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::a00:27ff:fea5:4ca9/64 scope link 
       valid_lft forever preferred_lft forever
5: br-ex: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN 
    link/ether 08:00:27:c2:ce:6f brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.109/24 scope global br-ex

Y el acceso via web sigue funcionando en http://192.168.1.46/horizon

Restart networking, as follows:
  service networking restart
    top: Unknown instance: 
    start: Job failed to start
No se porque, lo omito.


Enable a simple NAT service so that Compute nodes can access the Internet through the Cloud Controller:
  iptables -A FORWARD -i eth1 -o br-ex -s 10.10.10.0/24 -m conntrack --ctstate NEW -j ACCEPT
  iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
  iptables -A POSTROUTING -s 10.10.10.0/24 -t nat -j MASQUERADE

apt-get install iptables-persistent
Para que persistan las reglas de iptables. Tiene un menu en la instalación que nos pregunta si queremos guardar las reglas actualmente cargadas.


vi /etc/quantum/quantum.conf
  [DEFAULT]
  verbose = True
  rabbit_password = password
  rabbit_host = 10.10.10.10
  [keystone_authtoken]
  auth_host = 10.10.10.10
  admin_tenant_name = service
  admin_user = quantum
  admin_password = password

vi /etc/quantum/plugins/openvswitch/ovs_quantum_plugin.ini
  [database]
  sql_connection = mysql://quantum:password@10.10.10.10/quantum
  [ovs]
  tenant_network_type = gre
  tunnel_id_ranges = 1:1000
  enable_tunneling = True
  local_ip = 10.10.10.9
  [securitygroup]
  firewall_driver = quantum.agent.linux.iptables_firewall.OVSHybridIptablesFirewallDriver

vi /etc/quantum/dhcp_agent.ini
  [DEFAULT]
  enable_isolated_metadata = True
  enable_metadata_network = True

vi /etc/quantum/metadata_agent.ini
  auth_url = http://10.10.10.10:35357/v2.0
  auth_region = RegionOne
  admin_tenant_name = service
  admin_user = quantum
  admin_password = password
  nova_metadata_ip = 10.10.10.10
  metadata_proxy_shared_secret = password

service quantum-plugin-openvswitch-agent start
service quantum-dhcp-agent restart
service quantum-metadata-agent restart
service quantum-l3-agent restart


Comprobar errores: /var/log/quantum/*.log

ERRORES:

root@network:/var/log/quantum# tail openvswitch-agent.log 
Command: ['sudo', 'quantum-rootwrap', '/etc/quantum/rootwrap.conf', 'ovs-vsctl', '--timeout=2', 'set', 'Interface', 'patch-tun', 'options:peer=patch-int']
Exit code: 1
Stdout: ''
Stderr: 'ovs-vsctl: no row "patch-tun" in table Interface\n'
2013-09-30 21:54:53    ERROR [quantum.agent.linux.ovs_lib] Unable to execute ['ovs-vsctl', '--timeout=2', 'get', 'Interface', 'patch-tun', 'ofport']. Exception: 
Command: ['sudo', 'quantum-rootwrap', '/etc/quantum/rootwrap.conf', 'ovs-vsctl', '--timeout=2', 'get', 'Interface', 'patch-tun', 'ofport']
Exit code: 1
Stdout: ''
Stderr: 'ovs-vsctl: no row "patch-tun" in table Interface\n'
2013-09-30 21:54:53 CRITICAL [quantum] int() argument must be a string or a number, not 'NoneType'

root@network:/var/log/quantum# tail l3-agent.log 
2013-09-30 21:57:34    ERROR [quantum.openstack.common.rpc.common] AMQP server on 10.10.10.10:5672 is unreachable: [Errno 113] EHOSTUNREACH. Trying again in 25 seconds.

root@network:/var/log/quantum# tail dhcp-agent.log 
2013-09-30 21:56:07    ERROR [quantum.openstack.common.rpc.common] AMQP server on 10.10.10.10:5672 is unreachable: [Errno 113] EHOSTUNREACH. Trying again in 15 seconds.


#### Compute Node ####
