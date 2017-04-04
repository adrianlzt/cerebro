Instrucciones para limpiar puertos, subredes, redes, routers de un tenant

openstack --insecure port list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack --insecure port delete

openstack --insecure subnet list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack --insecure subnet delete

openstack --insecure network list -f json | jq -r '.[].ID' | xargs -P 5 -n 1 openstack --insecure network delete
