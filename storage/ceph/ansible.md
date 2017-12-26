http://docs.ceph.com/ceph-ansible/master/

git clone https://github.com/ceph/ceph-ansible.git
cd ceph-ansible
git br -la | grep stable
Hacer checkout a la stable que queramos, generalmente la más nueva


Crear nuestro fichero de inventario:
[mons]
mon1
mon2
mon3

[mgrs]
mon1
mon2
mon3

[osds]
osd1
osd2
osd3


Playbook:
cp site.yml.sample site.yml

Variables donde definimos como vamos a montar el cluster
cp group_vars/all.yml.sample group_vars/all.yml
vi group_vars/all.yml (típica conf mínima)

ceph_origin: repository
ceph_repository: community
ceph_stable_release: luminous
public_network: "192.168.1.0/24"
monitor_interface: eth1
radosgw_interface: eth1
devices:
  - '/dev/sdb'
osd_scenario: collocated
osd_objectstore: bluestore



http://docs.ceph.com/ceph-ansible/master/osds/scenarios.html
osd_scenario: define como se van a configurar los discos
  - collocated: data y metadata en el mismo disco. Debemos pasar discos enteros (ceph lo particionará)
  - non-collocated: data y metadata (journal) en distintos discos
  - lvm: para usar logical volumes (ya creados)

BlueStore es el nuevo motor de búsqueda (versiones luminous/12.2 y superiores). Mejor performance

Si en los devices especificamos discos ya en uso puede que falle. Mejor desmontar y limpiar (de particiones) los discos primero (visto con un disco que estaba siendo usado por LVM, con un LV creado)
Podemos usar osd_auto_discovery para usar todos los discos que se encuentren sin particionar.

Antes de lanzarlo, modificar el ansible.cfg para poner el fichero de log en algún sitio donde podamos escribir

Despliegue:
ansible-playbook -i inventory site.yml


Si tenemos problemas con ansible y sftp poner en ansible.cfg:
[ssh_connection]
scp_if_ssh=True


Tras el despliegue comprobaremos el estado del cluster con:
ceph status
