Los ejemplos son para Havana. Mirar si han añadido nuevos parámetros al schema para no tener que usar value_spec (value_spec no se chequea su valided)

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
      value_specs:
        host_routes:
          - destination: 10.0.0.0/8
            nexthop: 192.168.99.22
          - destination: 182.0.0.0/8
            nexthop: 1.18.9.22


  router:
    type: OS::Neutron::Router
    properties:
      value_specs:
        external_gateway_info:
          network_id: { get_param: ext_net }

