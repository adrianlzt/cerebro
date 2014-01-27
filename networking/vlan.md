Crear una interfaz virtual en una vlan determinada:
vconfig add <interfaz> <num-vlan>

Con el comando ip:
ip link add link eth1 name eth1.1248 type vlan id 1248


Con esto creamos interfaces, que luego tenemos que configurar con ifconfig, ip addr o lo que sea
