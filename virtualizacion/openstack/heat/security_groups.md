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


# Definir un sec group. No existe elemento propio de Openstack hasta Available since 2014.1 (Icehouse).
  ssh_security_group:
    type: AWS::EC2::SecurityGroup
    properties:
      GroupDescription: Enable SSH access
      VpcId:
      SecurityGroupIngress:
      - IpProtocol: 'tcp'
        FromPort: '22'
        ToPort : '22'
        CidrIp : '0.0.0.0/0'


  the_resource:
    type: OS::Neutron::SecurityGroup
    properties:
      description: String
      name: String
      rules: [{"remote_group_id": String, "direction": String, "remote_ip_prefix": String, "port_range_min": Integer, "remote_mode": String, "ethertype": String, "port_range_max": Integer, "protocol": String}, {"remote_group_id": String, "direction": String, "remote_ip_prefix": String, "port_range_min": Integer, "remote_mode": String, "ethertype": String, "port_range_max": Integer, "protocol": String}, ...]
