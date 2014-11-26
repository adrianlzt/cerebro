http://docs.openstack.org/trunk/openstack-network/admin/content/index.html

(Anteriormente era Quantum)

Extensiones disponibles
neutron ext-list

Creamos una red y le conectamos dos máquinas:
neutron net-create vrrp-net
neutron subnet-create  --name vrrp-subnet --allocation-pool start=10.0.0.2,end=10.0.0.200 vrrp-net 10.0.0.0/24
neutron router-create router1
neutron router-interface-add router1 vrrp-subnet 
neutron router-gateway-set router1 public
neutron security-group-create vrrp-sec-group
neutron security-group-rule-create  --protocol icmp vrrp-sec-group 
neutron security-group-rule-create  --protocol tcp  --port-range-min 80 --port-range-max 80 vrrp-sec-group 
neutron security-group-rule-create  --protocol tcp  --port-range-min 22 --port-range-max 22 vrrp-sec-group
nova boot --num-instances 2 --image ubuntu-12.04 --flavor 1 --nic net-id=24e92ee1-8ae4-4c23-90af-accb3919f4d1 vrrp-node --security_groups --key-name nombre vrrp-sec-group

Creamos un puerto con una ip fija (sin asociación a ninguna máquina) y le asociamos una ip flotante:
neutron port-create --fixed-ip ip_address=10.0.0.201 --security-group vrrp-sec-group vrrp-net
neutron floatingip-create --port-id=6239f501-e902-4b02-8d5c-69062896a2dd public

Asociamos el puerto de la ip flotante a los dos nodos (primero obtenemos los ids de los puertos):
nova interface-list vrrp-node-352792a2-243d-4233-b6f0-45d229c7db04
nova interface-list vrrp-node-77a61396-1078-43b6-81b8-1458840ac136
neutron port-update c080dbeb-491e-46e2-ab7e-192e7627d050 --allowed_address_pairs list=true type=dict ip_address=10.0.0.201
neutron port-update 12bf9ea4-4845-4e2c-b511-3b8b1ad7291d --allowed_address_pairs list=true type=dict ip_address=10.0.0.201


Quedaria usar keepalived o pacemaker para configurar la ip.
