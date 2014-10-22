http://docs.openstack.org/developer/heat/template_guide/environment.html

Podemos tener un fichero de entorno donde definamos las variables que usaremos en un stack.
De esta manera podremos tener en un fichero como crear un stack y en otro yaml los parametros.

También podremos definir una variable solo para un elemento en particular (para el resto usar default, al no pasar nada):
resource_registry:
  resources:
    my_db_server:
      "OS::DBInstance": file:///home/mine/all_my_cool_templates/db.yaml

heat stack-create my_stack -e my_env.yaml -P "some_parm=bla" -f my_tmpl.yaml

Los parámetros pasados por línea de comandos tendrán más prioridad que los del template (my_env.yaml) y estos más que los globales (/etc/heat/environment.d)

my_env.yaml:
parameters:
  key_name: heat_key
  flavor: m1.micro
  image: F18-x86_64-cfntools

Mirar:
ejemplo_stack.yaml
ejemplo_env.yaml
