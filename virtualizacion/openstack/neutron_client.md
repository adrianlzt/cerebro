# Instalacion

Ubuntu:
sudo apt-get install python-neutronclient

# Configuracion
mirar credenciales.md

# Comandos
neutron net-list
  mostrar redes

neutron subnet-list
  mostrar subredes


# Crear red son sus subredes, etc
En vez de usar uuid se pueden usar los nombres

neutron --insecure net-create int_inodos
neutron --insecure subnet-create --allocation-pool start=172.22.0.20,end=172.22.0.200 --gateway 172.22.0.1 --name int_sub_inodo f6a055c7-0557-4408-a582-57b881e6eea5 172.22.0.0/24
  creo subred para la red int_inodos. El f6a0... es el uuid de la red int_inodos
neutron --insecure router-create router_inodo
  creo router
neutron --insecure router-gateway-set a8abe81d-8162-40c0-8218-5202961a0c96 4df1ea57-c515-4a76-968d-7a99c495ba75
  uno el router a8a... a la red ext_inodos 4df1...
neutron --insecure router-interface-add a8abe81d-8162-40c0-8218-5202961a0c96 2de7f4fc-e414-4732-96c7-9fda7f77251b
  conecto el router a8a... a la subred de int_inodos 2de...



# Port
neutron port-create --name int_inodos-router-port 4df1ea57-c515-4a76-968d-7a99c495ba75
  creo puerto en la red de inodos para conectar el router

Mostrar puertos de una red determinada:
neutron port-list -- --network_id=3b7c7ead-4ee1-4fe7-a2c6-a2b7c60b9ff9


# Floating IP
neutron floatingip-create ext_mgmt

neutron floatingip-associate <floatingIP_uuid> <port_uuid>

nova add-floating-ip
