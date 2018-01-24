http://docs.ceph.com/ceph-ansible/master/

git clone https://github.com/ceph/ceph-ansible.git
cd ceph-ansible
git br -la | grep stable
Hacer checkout a la stable que queramos, generalmente la más nueva

Se hace uso intensivo de los facts. Cuidado con el fact caching!
Tal vez algo "no funciona" y es porque estamos usando facts cacheados algo más antiguos que cambios que hayamos metidos (visto al meter discos nuevos en una máquina virtual)


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

[rgws]
rwg1


El rwgs es por si queremos tener interfaz de objetos (tipo Amazon S3)

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
  - lvm: para usar logical volumes (ya creados). Debe especificarse un journal a parte. (mirar docs/source/osds/scenarios.rst). Ejemplo:
         osd_scenario: lvm
         lvm_volumes:
           - data: nombreLVdatos
             data_vg: nombreVGdatos
             journal: nombreLVjournal
             journal_vg: nombreVGjournal


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


Mirar managers.md si queremos activar el dashboard.
Para activar el dashboard poner en el group_vars/all (probado en un despliegue y no me hizo caso)
ceph_mgr_modules:
  - status
  - dashboard


# RWG
Configurar SSL: https://github.com/ceph/ceph-ansible/commit/6f3a98919cf33e6684a380bd3b6abdc9934b3a9f
port=7480+7443s ssl_certificate=/etc/ceph/private/keyandcert.pem


# Single node
Definir los parametros:
  osd pool default size = 2
  osd crush chooseleaf type = 0

Default pool size is how many replicas of our data we want (2).
The chooseleaf setting is required to tell ceph we are only a single node and that it’s OK to store the same copy of data on the same physical node. Normally for safety, ceph distributes the copies and won’t leave all your eggs in the same basket (server).

Para definirlas, en el group_vars/all
ceph_conf_overrides:
  global:
    osd_pool_default_size: 2
common_single_host_mode: true
