http://docs.openstack.org/developer/heat/template_guide/index.html
HOT: Heat Orchestration Template

## Estructura básica:
heat_template_version: 2013-05-23

description:
  # a description of the template

parameter_groups:
  # a declaration of input parameter groups and order

parameters:
  # declaration of input parameters

resources:
  # declaration of template resources

outputs:
  # declaration of output parameters



## Parameters
http://docs.openstack.org/developer/heat/template_guide/hot_spec.html#parameters-section
http://docs.openstack.org/developer/heat/template_guide/hot_spec.html#parameter-constraints

parameters:
  nombre:
    type: <string | number | json | comma_delimited_list | boolean>
    label: <human-readable name of the parameter>
    description: <description of the parameter>
    #default: valor_por_defecto
    #hidden: <true | false>
    # esconde el parametro cuando se hace un stack-show
    #constraints:
    #  - allow_values: [ m1.medium, m1.large, m1.xlarge ]
    #    description: Value must be one of m1.medium, m1.large or m1.xlarge.
    #  - length: { min: 6, max: 8 }
    #    description: Password length must be between 6 and 8 characters.
    #  - allowed_pattern: "[a-zA-Z0-9]+"
    #    description: Password must consist of characters and numbers only.
    #  - allowed_pattern: "[A-Z]+[a-zA-Z0-9]*"
    #    description: Password must start with an uppercase character.

Para usar un parámetro:
{ get_param: nombre }

Dos parámetros siempre presentes: OS::stack_name y OS::stack_id

Si ponemos "type: comma_delimited_list", el parámetro se pasará como ["cosa","otro"]


## Resources
resources:
  <resource ID>:
    type: <resource type>
    properties:
      <property name>: <property value>
    metadata:
      <resource specific metadata>
    depends_on: <resource ID or list of ID>
    update_policy: <update policy>
    deletion_policy: <deletion policy>


## Outputs
Al hacer stack-show mostrar en el apartado "Outputs" cierta información:

outputs:
  instance_ip:
    description: The IP address of the deployed instance

outputs:
  server1_az1_floating_ip:
    description: Floating IP address of server1_az1
    value: { get_attr: ["float1", "floating_ip_address"]}



Para saber que output podemos sacar debemos mirar el código. Para este caso, network en la versión Havana: https://github.com/openstack/heat/blob/havana-eol/heat/engine/resources/neutron/net.py
En el elemento attributes_schema vemos que parámetros podemos obtener.

resources:
  net:
    type: OS::Neutron::Net
    properties:
      name: nombrered

outputs:
  net_show_all:
    description: All net information
    value: { get_attr: [net, show] }

outputs 
[
  {
    "output_value": {
      "status": "ACTIVE",
      "subnets": [],
      "name": "nombrered",
      "router:external": false,
      "tenant_id": "888f135f4d444d188037f73411a5e1e0",
      "admin_state_up": true,
      "shared": false,
      "id": "f7c52333-0eb1-4636-bda9-d97c082791c6"
    },
    "description": "All net information",
    "output_key": "net_show_all"
  }
]


Para sacar un elemento determinado (no me funciona cambiando "all" por "id"):
value: { "Fn::Select" : [ "id", { get_attr: [net, show]} ] }
