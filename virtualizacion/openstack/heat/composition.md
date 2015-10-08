http://docs.openstack.org/developer/heat/template_guide/composition.html

Código nested stacks en Havana: 
https://github.com/openstack/heat/blob/havana-eol/heat/engine/resources/stack.py
https://github.com/openstack/heat/blob/havana-eol/heat/engine/stack_resource.py#

Hace falta una versión reciente del heat client para poder usar esta función.
0.2.8 no funciona
0.2.12 si funciona

Para no terminar con un YAML gigante, dividiremos nuestro template HOT en varios ficheros yaml y los iremos llamando desde uno más general.

Por ejemplo, tendremos un yaml para definir un servidor y luego el yaml principal que cada vez que quiera crear un servidor llamará a ese yaml de servidor.

Acceso a recursos nested:  Accessing nested attributes requires heat_template_version 2014-10-16 or higher
outputs:
  test_out:
      value: {get_attr: my_server, resource.server, first_address}


PROBLEMA: como hacemos un get_resource desde un fichero nomain2.yaml a otro elemento de nomain1.yaml? El nombre del recurso es el mismo solo que se ha llamado dos veces.
Tal vez se pueda hacer un output en el nomainN.yaml usado, y coger desde el main.yaml el valor. Como se sacaria un uuid por output?
https://github.com/openstack/heat/blob/5683185f2ad2ff5bcfe0757f988dc5c57d69aebc/heat/engine/resources/template_resource.py
  "This implementation passes resource properties as parameters to the nested stack. Outputs of the nested stack are exposed as attributes of this resource"


my_nova.yaml
heat_template_version: 2013-05-23
parameters:
  key_name:
    type: string
    description: Name of a KeyPair
resources:
  server:
    type: OS::Nova::Server
    properties:
      key_name: {get_param: key_name}
      flavor: my.best
      image: the_one_i_always_use

main.yaml
heat_template_version: 2013-05-23
resources:
  my_server:
    type: my_nova.yaml
    properties:
      key_name: my_key

En el type se puede usar:
  Relative path (type: my_nova.yaml)
  Absolute path (type: file:///home/user/templates/my_nova.yaml)
  Http URL (type: http://example.com/templates/my_nova.yaml)
  Https URL (type: https://example.com/templates/my_nova.yaml)


# Override un resource
env.yaml
resource_registry:
  "OS::Nova::Server": my_nova.yaml

Ahora cuando hagamos
resources:
  my_server:
    type: OS::Nova::Server

Estaremos usando my_nova.yaml si cargamos el env.yaml:
heat stack-create -f main.yaml -e env.yaml example-two


