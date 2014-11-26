http://blog.aaronorosen.com/implementing-high-availability-instances-with-neutron-using-vrrp/

Comprobar que tenemos el módulo necesario cargado
neutron ext-list | grep allowed-address-pairs

neutron net-create vrrp-net
neutron subnet-create  --name vrrp-subnet --allocation-pool start=192.168.33.2,end=192.168.33.200 vrrp-net 192.168.33.0/24
