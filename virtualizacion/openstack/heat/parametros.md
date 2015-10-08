Si queremos pasar un array como parámetro:


parameters:
  host_routes:
    type: json
    description: Host routes for the subnet

resources:
  subnet:
    type: OS::Neutron::Subnet
    properties:
      network_id: { get_resource: net }
      cidr: { get_param: cidr }
      gateway_ip: { get_param: gateway }
      dns_nameservers: { get_param: dns }
      allocation_pools:
        - start: { get_param: pool_start }
          end: { get_param: pool_end }
      host_routes: { get_param: [ host_routes, map ] }



Al llamarlo:
resources:
  net_tools_inet:
    type: network.yaml
    properties:
      name: dsmctools_test
      dns: ['8.8.8.8','8.8.4.4']
      cidr: '192.168.55.0/24'
      gateway: '192.168.55.1'
      pool_start: '192.168.55.20'
      pool_end: '192.168.55.150'
      ext_net: 8e740863-8441-46bc-b89c-153bfb0edae3
      host_routes: {"map":[{"destination":"10.0.0.0/8","nexthop":"192.168.99.22"}]}

