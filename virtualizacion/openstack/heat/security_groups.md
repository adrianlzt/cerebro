http://docs.openstack.org/developer/heat/template_guide/openstack.html#OS::Nova::Server

Cuidado con asignar un security group a un server y tener ports asociados:
List of security group names or IDs. Cannot be used if neutron ports are associated with this server; assign security groups to the ports instead.


  server1_az1_port_mgmt:
    type: OS::Neutron::Port
    properties:
      network_id: { get_resource: net_mgmt }
      security_groups: { get_param: sec_groups } # Debe ser una lista de IDs

  server1_az1:
    type: OS::Nova::Server
    properties:
      ...
      networks:
        - port: { get_resource: server1_az1_port_mgmt }
        - port: { get_resource: server1_az1_port_inet }
