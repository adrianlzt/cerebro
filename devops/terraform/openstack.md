https://www.terraform.io/docs/providers/openstack/

Algunos elementos nos obligan a poner el id del elemento en vez de dejarnos poner el nombre (red externa en un router por ejemplo)


Problemas:

Modificar el cidr de una subnet donde están conectadas VMs.
terraform intentará borrar la subred, pero openstack no le dejará porque están las VMs conectadas.
Solución, destroy y recrear todo.
