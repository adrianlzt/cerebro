http://docs.ceph.com/ceph-ansible/master/

git clone https://github.com/ceph/ceph-ansible.git
cd ceph-ansible
git br -la | grep stable
Hacer checkout a la stable que queramos, generalmente la más nueva
Quitar de gitignore / añadir a git:
  directorio fetch
  variables group_vars y host_vars
  site.yml
  inventory

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

Podemos usar docker para desplegar ceph, usar el playbook:
site-container.yml

Como lanza los containers para simular estar en el host:
docker run --rm --privileged --net=host --ipc=host -v /run/lock/lvm:/run/lock/lvm:z -v /var/run/udev/:/var/run/udev/:z -v /dev:/dev -v /etc/ceph:/etc/ceph:z -v /run/lvm/:/run/lvm/ -v /var/lib/ceph/:/var/lib/ceph/:z -v /var/log/ceph/:/var/log/ceph/:z --entrypoint=ceph-volume docker.io/ceph/daemon:v4.0.0-stable-4.0-nautilus-centos-7-x86_64 --cluster ceph lvm list

Si no queremos que intente instalar docker, quitar este include role: ceph-container-engine

No instala zabbix_sender, tendremos que meterl el paquete XXX a mano dentro del container. zabbix40

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

ntp_service_enabled: true

con stable-4.0 tuve que meter a mano el repo ceph e instalar ceph-grafana-dashboards.noarch para que funcionase grafana. Arreglado upstream parece: https://github.com/ceph/ceph-ansible/commit/6e2e30db54bafb271f7f5bd087f426e5762d9e7e#diff-ff7ce8b599f33b506ce38a5c4e0a5251




ANTIGUO
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

Tambien tendremos que definir el número de PGs por pool por defecto (si no lo cambiamos será 8, número solo válido si tenemos un OSD). Mirar placement_groups.md
No me queda muy claro si debemos poner este valor. Usando la calculadora (https://ceph.com/pgcalc/) tenemos distintos valores según que pool.
ceph_conf_overrides:
  global:
    osd pool default pg num = 1024
    osd pool default pgp num = 1024

Y si vamos a usar rgw, definimos el número de PGs por pool. La calculadora (https://ceph.com/pgcalc/) ya nos da el número de PGs que nos hará falta para cada pool
Que pasa si creamos a posteriori más PGs? Se hace rebalanceo?
Ejemplo:
create_pools:
  .rgw.root:
    pg_num: 16
  default.rgw.control:
    pg_num: 16
  default.rgw.data.root:
    pg_num: 16
  default.rgw.gc:
    pg_num: 16
  default.rgw.log:
    pg_num: 16
  default.rgw.intent-log:
    pg_num: 16
  default.rgw.meta:
    pg_num: 16
  default.rgw.usage:
    pg_num: 16
  default.rgw.users.keys:
    pg_num: 16
  default.rgw.users.email:
    pg_num: 16
  default.rgw.users.swift:
    pg_num: 16
  default.rgw.users.uid:
    pg_num: 16
  default.rgw.buckets.extra:
    pg_num: 16
  default.rgw.buckets.index:
    pg_num: 64
  default.rgw.buckets.data:
    pg_num: 2048



Despliegue:
ansible-playbook -i inventory site.yml


Si tenemos problemas con ansible y sftp poner en ansible.cfg:
[ssh_connection]
scp_if_ssh=True


Tras el despliegue comprobaremos el estado del cluster con:
ceph status


Para desplegar solo partes
ansible-playbook site.yml -l grupo


Mirar managers.md si queremos activar el dashboard.
Para activar el dashboard poner en el group_vars/all (probado en un despliegue y no me hizo caso)
ceph_mgr_modules:
  - status
  - dashboard


# RWG
Configurar SSL: https://github.com/ceph/ceph-ansible/commit/6f3a98919cf33e6684a380bd3b6abdc9934b3a9f
port=7480+7443s ssl_certificate=/etc/ceph/private/keyandcert.pem

Con ansible:
group_vars/all.yml
radosgw_civetweb_options: "num_threads={{ radosgw_civetweb_num_threads }} ssl_certificate=/etc/ceph/keyandcert.pem"
radosgw_civetweb_port: "8080+8443s"

site.yml:
- hosts: rgws
  gather_facts: false
  become: True
  pre_tasks:
    - name: copy cert
      copy: src=cert_with_bundle_and_key.pem dest=/etc/ceph/keyandcert.pem
            owner=root group=root mode=0440




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




# Purge
Limpiar la instalación
ansible-playbook infrastructure-playbooks/purge-cluster.yml


# Errores
Probar a hacer un purge y a instalar de nuevo
