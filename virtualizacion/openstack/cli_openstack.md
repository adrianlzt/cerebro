Esta cli sustituye a las antiguas que estaban separadas: nova, neutron, keystone, etc

openstack availability zone list - Lista las AZs
openstack aggregate list - Nos muestra la lista de las AZs con su ID y name
openstack aggregate show [ID or Name] - Info de cada AZ (hosts de cada AZ)
openstack host list - Muestra todos los host y en que AZ estan
openstack host show [HOST] - info del host (CPU, RAM y Disco)
openstack hypervisor stats show - Estadisticas globales del entorno
openstack hypervisor show [ID or Hypervisor Hostname] - info especifica del host
  --> con el parametro "-c [campo]" obtienes únicamente el valor requerido
