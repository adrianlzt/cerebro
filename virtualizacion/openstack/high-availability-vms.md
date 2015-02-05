http://blog.aaronorosen.com/implementing-high-availability-instances-with-neutron-using-vrrp/

Comprobar que tenemos el módulo necesario cargado
neutron ext-list | grep allowed-address-pairs

neutron net-create vrrp-net
neutron subnet-create  --name vrrp-subnet --allocation-pool start=192.168.33.2,end=192.168.33.200 vrrp-net 192.168.33.0/24


La VIP que asignemos que esté fuera del pool de la subred.

El "truco" está en decirle al puerto de las máquinas que puedan tener la VIP que acepten conexiones entrantes de la VIP:
En este caso c080dbeb-491e-46e2-ab7e-192e7627d050 es el puerto de la máquinas y la VIP es 10.0.0.201
$ neutron port-update  c080dbeb-491e-46e2-ab7e-192e7627d050 --allowed_address_pairs list=true type=dict ip_address=10.0.0.201

Si hacemos port-show veremos que sigue diciendo:
| status                | DOWN
Omitirlo, porque funciona a pesar de esto.


Para varias ips:
neutron port-update 12bf9ea4-4845-4e2c-b511-3b8b1ad7291d –allowed_address_pairs list=true type=dict ip_address=10.0.0.201,ip_address=y.y.y.y etc
