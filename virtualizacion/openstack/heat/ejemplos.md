# Ejemplos
https://github.com/openstack/heat-templates
https://raw.githubusercontent.com/openstack/heat-templates/master/hot/hello_world.yaml

Ejemplos de Rackspace:
http://rcbops.github.io/templates/

# Ejecutar ejemplo super sencillo (no tocar el heat_template_version):
basic.yaml:
heat_template_version: 2013-05-23
resources:
  server:
    type: OS::Nova::Server
    properties:
      key_name: PARCLAVES
      image: IMAGEN
      flavor: SABOR

Nos devuelve un id del stack con el status "CREATE_IN_PROGRESS".


https://github.com/cmyster/templates/blob/master/juno_test_template.yaml
https://github.com/cmyster/templates/blob/master/lb_server.yaml
