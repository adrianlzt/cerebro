OpenStack está pensado para estar dividido en tres partes principales: 
  Compute -> nova
  Networking -> quantum
  Virtual Disk -> glance
  UI -> horizon
  Identity service -> keystone
  Objetc storage -> swift
  Block storage -> cinder

Componentes en Havana: Nova, Glance, Swift, Horizon, Keystone, Neutron, Cinder, Heat, Ceilometer



                         Internet
     -----------------------X-----------------
 Network				Cloud controller
  node	             Compute		  node
   |			node		   |
   |			|		   |
   ----------management network------------


Cloud controller: host the OpenStack Image Service, the OpenStack Block Storage Service, the OpenStack Identity Service, and the OpenStack Dashboard. It will also run portions of the OpenStack Compute service such as the API server, the scheduler, conductor, console authenticator, and VNC service. Finally, it hosts the API endpoint for the OpenStack Network service.

Network controller: Provides the bulk of the OpenStack Network services such as DHCP, layer 2 switching, layer 3 routing, floating IPs (which this guide does not configure), and metadata connectivity.

Compute node: Runs the OpenStack Compute service as well as the OpenStack Network service agent (in this case, the Open vSwitch plugin agent). This server also manages an OpenStack-compatible hypervisor such as KVM or Xen. This server will host the actual virtual machines (instances).


Esta división puede variar, habiendo partes en la misma máquina, o separando más algunas partes.



Redes:
The Management, Data, and API networks are commonly the same network

Management network. Used for internal communication between OpenStack components. The IP addresses on this network should be reachable only within the data center. 

Data network. Used for VM data communication within the cloud deployment. The IP addressing requirements of this network depend on the OpenStack Networking plugin in use. 

External network. Provides VMs with Internet access in some deployment scenarios. The IP addresses on this network should be reachable by anyone on the Internet. 

API network. Exposes all OpenStack APIs, including the OpenStack Networking API, to tenants. The IP addresses on this network should be reachable by anyone on the Internet. This may be the same network as the external network, as it is possible to create a quantum subnet for the external network that uses IP allocation ranges to use only less than the full range of IP addresses in an IP block.

