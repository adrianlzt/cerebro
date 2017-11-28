https://www.terraform.io/docs/providers/openstack/

Algunos elementos nos obligan a poner el id del elemento en vez de dejarnos poner el nombre (red externa en un router por ejemplo)


Generalmente tendremos un fichero credentials.auto.tfvars donde pondremos las credenciales de acceso a OST:
ost_user = ""
ost_pass = ""
ost_tenant = ""
ost_endpoint = "https://openstack.inet:13000/v2.0"

En el .tf definiremos esas variables y declararemos el provider
variable ost_user {}
variable ost_pass {}
variable ost_tenant {}
variable ost_endpoint {}

provider "openstack" {
  user_name   = "${var.ost_user}"
  tenant_name = "${var.ost_tenant}"
  password    = "${var.ost_pass}"
  auth_url    = "${var.ost_endpoint}"
}


Luego iremos mirando como se llaman los recursos en web y creandolos.


Problemas:

Modificar el cidr de una subnet donde están conectadas VMs.
terraform intentará borrar la subred, pero openstack no le dejará porque están las VMs conectadas.
Solución, destroy y recrear todo.
