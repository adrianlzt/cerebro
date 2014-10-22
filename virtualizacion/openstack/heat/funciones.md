http://docs.openstack.org/developer/heat/template_guide/functions.html
https://github.com/openstack/heat/blob/master/heat/engine/hot/functions.py

Fn::GetAZs
Returns the Availability Zones within the given region.
{Fn::GetAZs: ""}


{ "Fn::Split" : [ ",", "str1,str2,str3,str4"]}
Returns {["str1", "str2", "str3", "str4"]}.


## Funciones intrínsecas
http://docs.openstack.org/developer/heat/template_guide/hot_spec.html#hot-spec-intrinsic-functions

{ get_attr: [my_instance, networks, private, 0] }

user_data:
  get_file: http://example.com/my_other_instance_user_data.sh

{ get_param: instance_type}

networks:
  - port: { get_resource: server1_port }

list_join: [', ', ['one', 'two', 'and three']]
# "one, two, and three"

str_replace:
  template: http://host/MyApplication
  params:
    host: { get_attr: [ my_instance, first_address ] }

template: |
  #!/bin/bash
  echo "Hello world"
  echo "Setting MySQL root password"
  mysqladmin -u root password $db_rootpassword
  # do more things ...
params:
  $db_rootpassword: { get_param: DBRootPassword }


