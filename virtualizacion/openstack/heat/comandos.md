heat stack-create -f fichero.yaml nombre
  creo la stack nombre a partir del fichero fichero.yaml

heat stack-create -e https://github.com/openstack/heat-templates/blob/master/hot/hello_world.yaml testadri -P key_name=NOMBRECLAVES -P flavor=m1.small -P image=NOMBREIMAGEN -P admin_pass=PASSWORD
  paso parametros a una stack

heat stack-list
  ver las stack lanzadas y su status

heat stack-show nombre/id
  más información sobre ese stack

heat event-list nombre/id
  mostrar eventos sucedidos para una stack particular

heat stack-delete teststack
  borrar un stack

head stack-update
  podemos modificar el template y actualizará las cosas para que se quede como la nueva definición.
  https://github.com/rackerlabs/heat-tutorial/blob/master/105.Update-Stack/README.md#5-update-it
