http://docs.ansible.com/ansible/list_of_cloud_modules.html

Para desplegar infraestructura mejor usar terraform.
Ansible puede traernos problemas de que duplique cosas o no ser completamente idempotente.
Tambien es más complicado reutilizar modulos e ir pasando variables generadas hacia los siguientes elementos a crear.


Auth: ~/.config/openstack/clouds.yaml

Los nuevos modulos (os...) tiran de la lib shade
http://docs.openstack.org/infra/shade/usage.html
https://github.com/openstack-infra/shade



# Network
http://docs.ansible.com/ansible/os_network_module.html

  - name: Create new network
    os_network:
      name: pruebadri
      state: present
      cloud: nombre_auth
      cacert: "ca.pem"
      api_timeout: 5
      timeout: 5

# Subnetwork
http://docs.ansible.com/ansible/os_subnet_module.html

  - name: Create subnet 
    os_subnet:
      name: pruebadri_subnet
      network_name: pruebadri
      state: present
      cidr: 192.168.99.0/24
      dns_nameservers:
         - 8.8.8.7
         - 8.8.8.8
      host_routes:
         - destination: 0.0.0.0/0
           nexthop: 12.46.78.9
         - destination: 192.168.0.0/24
           nexthop: 192.168.0.1
      cloud: nombre_auth
      cacert: "ca.pem"
      api_timeout: 5
      timeout: 5

# Router
No tiene aún la doc online
https://github.com/ansible/ansible-modules-core/blob/devel/cloud/openstack/os_router.py





# Errores
Creando una red:
fatal: [127.0.0.1]: FAILED! => {"changed": false, "failed": true, "msg": "Error creating network pruebadri: Policy doesn't allow create_network to be performed."}
https://community.runabove.com/share/topic/network-creation-api-policy
/usr/lib/python2.7/site-packages/shade/__init__.py

  1209          network = {
  1210              'name': name,
  1211              'shared': shared,
  1212              'admin_state_up': admin_state_up
  1213              #'admin_state_up': admin_state_up,
  1214              #'router:external': external
  1215          }

