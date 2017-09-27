https://dev.cloudwatt.com/en/blog/openstack-resources-cleanup-script.html
https://github.com/openstack/ospurge
pip install ospurge

Limpiar un tenant

ospurge --dry-run --purge-own-project
ospurge --verbose --purge-project NOMBRE_PROYECTO --dry-run

A mano:

# Borrar VMs
openstack server list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack server delete

# Borrar puertos, redes, subnets, nets
for i in $(openstack router list -f json | jq -r '.[].ID'); do
  openstack router remove port $i $(openstack port list --router $i -f json | jq -r '.[].ID')
done
openstack router list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack router delete
openstack port list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack port delete
openstack subnet list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack subnet delete
openstack network list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack network delete

# Borrar floating ip
openstack floating ip list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack floating ip delete

# Borrar security group
openstack security group list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack security group delete


# Borrar pares de claves
openstack keypair list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack keypair delete
