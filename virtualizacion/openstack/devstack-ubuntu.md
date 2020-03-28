http://devstack.org
http://devstack.org/stack.sh.html
http://devstack.org/samples/localrc.html
Keep in mind, the OpenStack install that DevStack performs is not persistent through reboots.

Desplegando openstack en una VM: http://devstack.org/guides/single-vm.html
Uso ubuntu precise cloud (http://cloud-images.ubuntu.com/precise/current/precise-server-cloudimg-vagrant-amd64-disk1.box)

Vagrant:
  usar public network
  en los scripts de despliegue de vagrant hago que instale git y haga un clone de devstack
  Mas automatización sería crear el fichero localrc y ejecutar stack.sh

# Config
localrc (sigiendo lo visto en http://www.stackgeek.com/blog/kordless/post/taking-openstack-for-a-spin):
HOST_IP=192.168.1.40 #La ip que asigne vagrant a eth1 sera la publica
FLAT_INTERFACE=eth1 #la interfaz publica es la 1
FIXED_RANGE=10.99.0.0/24 #rango de las ips privadas de las maquinas
FIXED_NETWORK_SIZE=256 #256 para /24, es eso lo que quiere?
FLOATING_RANGE=192.168.1.224/27 #ips publicas de las instancias. Debe coincidir con nuestra red local. Usamos .224/27 para que solo asigne a partir de .225
ADMIN_PASSWORD=password
MYSQL_PASSWORD=password
RABBIT_PASSWORD=password
SERVICE_PASSWORD=password
SERVICE_TOKEN=tokentoken

# Despliegue
./stack.sh


# Uso
Horizon is now available at http://192.168.1.40/
Keystone is serving at http://192.168.1.40:5000/v2.0/
Examples on using novaclient command line is in exercise.sh
The default users are: admin and demo
The password: password
This is your host ip: 192.168.1.40
stack.sh completed in 774 seconds.


The OpenStack repos on Github get updated all the time. If you want to stay up-to-date with these changes, I recommend periodically doing a git pull request in each of the directories that get stuffed into /opt/stack/. You can kill your instance of OpenStack before you do this by doing a killall screen.
You can also use the rejoin-stack.sh script if you've already run the script and are wanting to fire it back up again after killing it.


# Networking
https://docs.openstack.org/devstack/latest/networking.html
https://docs.openstack.org/devstack/latest/guides/neutron.html

br-int is a bridge that the Open vSwitch mechanism driver creates, which is used as the “integration bridge” where ports are created, and plugged into the virtual switching fabric.

br-ex is an OVS bridge that is used to connect physical ports (like eth0), so that floating IP traffic for project networks can be received from the physical network infrastructure (and the internet), and routed to self service project network ports.

br-tun is a tunnel bridge that is used to connect OpenStack nodes (like devstack-2) together. This bridge is used so that project network traffic, using the VXLAN tunneling protocol, flows between each compute node where project instances run.

ovs-vsctl show
  ver estado de los br-*



### OLD ###
Ejecuto los scripts a mano (cloud-init no es para este caso de uso con virtualbox)

Pasos (mirar más abajo en el fichero los valores para localrc):
  apt-get update
  apt-get install -y git
  git clone https://github.com/openstack-dev/devstack.git
  cd devstack

Estas instrucciones no funcionan
Sigo las instrucciones de http://networkstatic.net/installing-openstack-grizzly-with-devstack/ para lograr que aparezca el networking
Edito el fichero localrc y lo dejo asi:
ENABLED_SERVICES=q-meta,q-lbaas,n-obj,n-cpu,n-sch,n-cauth,horizon,mysql,rabbit,sysstat,cinder,c-api,c-vol,c-sch,n-cond,quantum,q-svc,q-agt,q-dhcp,q-l3,n-novnc,n-xvnc,q-lbaas,g-api,g-reg,key,n-api,n-crt
ADMIN_PASSWORD=password
MYSQL_PASSWORD=password
RABBIT_PASSWORD=password
SERVICE_PASSWORD=password
SERVICE_TOKEN=tokentoken
# Compute Service
NOVA_BRANCH=stable/grizzly
# Volume Service
CINDER_BRANCH=stable/grizzly
# Image Service
GLANCE_BRANCH=stable/grizzly
# Web UI (Dashboard)
HORIZON_BRANCH=stable/grizzly
# Auth Services
KEYSTONE_BRANCH=stable/grizzly
# Quantum (Network) service
QUANTUM_BRANCH=stable/grizzly
#Enable Logging
LOGFILE=/opt/stack/logs/stack.sh.log
VERBOSE=True
LOG_COLOR=False
SCREEN_LOGDIR=/opt/stack/logs

  ./stack.sh

Da error:
2013-09-17 20:00:54 [Call Trace]
2013-09-17 20:00:54 stack.sh:851:start_keystone
2013-09-17 20:00:54 /opt/stack/devstack/lib/keystone:333:die
2013-09-17 20:00:54 [ERROR] /opt/stack/devstack/lib/keystone:333 keystone did not start

Parece que es un bug en el keystone: https://bugs.launchpad.net/keystone/+bug/1201861

Uso el localrc:
echo ADMIN_PASSWORD=password > localrc
echo MYSQL_PASSWORD=password >> localrc
echo RABBIT_PASSWORD=password >> localrc
echo SERVICE_PASSWORD=password >> localrc
echo SERVICE_TOKEN=tokentoken >> local

Con estos parámetros, devstack cogerá las últimas versionde de github de los proyectos (nova, etc)

./stack.sh

Horizon is now available at http://10.0.2.15/
Keystone is serving at http://10.0.2.15:5000/v2.0/
Examples on using novaclient command line is in exercise.sh
The default users are: admin and demo
The password: password
This is your host ip: 10.0.2.15
stack.sh completed in 774 seconds.

Por ahora uso lo que me da esta instalación.
Cuando me entere bien de que falta lo intentaré instalar a mano.

Esta configuración instala (según dice la información del sistema de horizon):
nova - compute
cinder - volumev2
nova - computev3
s3 - s3
glance - image
cinder - volume
ec2 - ec2
keystore - identity (native backend)
