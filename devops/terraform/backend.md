https://www.terraform.io/docs/backends/index.html

Podemos usar backends en linea para mantener un estado compartido.
Por ejemplo, etcd

Si queremos borrar el estado de etcd haremos algo tipo:
terraform-state/bootstrap-graph/
etcdctl --endpoints http://10.10.10.47:2379 del terraform-state/integracion-tfstate/default
