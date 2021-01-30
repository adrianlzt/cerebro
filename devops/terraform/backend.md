https://www.terraform.io/docs/language/state/remote.html

El estado por defecto se guarda en un fichero: terraform.tfstate


Podemos almacenar este estado en remoto para poder compartirlo con más gente y poder ejecutar terraforms sin miedo a pisar el trabajo de otro.
Para eso usaremos un backend

https://www.terraform.io/docs/backends/index.html

Podemos usar backends en linea para mantener un estado compartido.
Por ejemplo, etcd

Si queremos borrar el estado de etcd haremos algo tipo:
terraform-state/bootstrap-graph/
etcdctl --endpoints http://10.10.10.47:2379 del terraform-state/integracion-tfstate/default
