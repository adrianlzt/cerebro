http://devstack.org

Desplegando openstack en una VM: http://devstack.org/guides/single-vm.html
Uso centos64 con EPEL.

Dice que usemos cloud-init si vamos a desplegar en una máquina cloud que tenga este paquete.
Si no, ejecutar el script a mano en nuestra VM. Esto es lo que hago, ya que mi VM es virtualbox

Pasos:
  yum update -y
  yum install -y git
  git clone https://github.com/openstack-dev/devstack.git
  cd devstack
  echo ADMIN_PASSWORD=password > localrc
  echo MYSQL_PASSWORD=password >> localrc
  echo RABBIT_PASSWORD=password >> localrc
  echo SERVICE_PASSWORD=password >> localrc
  echo SERVICE_TOKEN=tokentoken >> localrc
  ./stack.sh

Tras la instalación nos informa:

Horizon is now available at http://10.0.2.15/
Keystone is serving at http://10.0.2.15:5000/v2.0/
Examples on using novaclient command line is in exercise.sh
The default users are: admin and demo
The password: password
This is your host ip: 10.0.2.15
stack.sh completed in 971 seconds.


Al intentar acceder a Horizon me da un error 500. Mirando los logs de apache veo que hay un error con la app django que quieren cargar (parece problema de path)
Parece que es un bug ya abierto: https://bugs.launchpad.net/ubuntu/+source/horizon/+bug/1221906
Intentar instalar el troveclient desde un rpm no funciona, porque necesita python >= 2.6.8
Solución:
  cd /tmp
  git clone https://review.openstack.org/openstack/horizon
  cd horizon/
  git fetch https://review.openstack.org/openstack/horizon refs/changes/66/46466/5
  git checkout FETCH_HEAD
  rm -fr /opt/stack/horizon/openstack_dashboard/
  cp -pr openstack_dashboard/ /opt/stack/horizon/
  cd openstack_dashboard/
  chown -R stack:stack *
  chmod -R g+w *
  chown stack:stack .
  chmod g+w .

Despues de esto me da otro error con otra libreria. Voy a usar mejor Ubuntu-server
