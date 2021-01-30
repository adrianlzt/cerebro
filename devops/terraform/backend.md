# State
https://www.terraform.io/docs/language/state/remote.html
El estado por defecto se guarda en un fichero: terraform.tfstate


Podemos almacenar este estado en remoto para poder compartirlo con más gente y poder ejecutar terraforms sin miedo a pisar el trabajo de otro.
Para eso usaremos un backend

Si hemos estado usando un state local, para migrar a un remote, configuraremos el backend y haremos
terraform init
Nos preguntará si queremos migrar los datos al backend remoto



# Backend
https://www.terraform.io/docs/backends/index.html

Podemos usar backends en linea para mantener un estado compartido.
Por ejemplo, etcd


## etcd
Si queremos borrar el estado de etcd haremos algo tipo:
terraform-state/bootstrap-graph/
etcdctl --endpoints http://10.10.10.47:2379 del terraform-state/integracion-tfstate/default


## Google cloud storage
https://www.terraform.io/docs/language/settings/backends/gcs.html

Crear un object en:
https://console.cloud.google.com/storage/browser
El nombre debe ser único (a nivel mundial) y será público.

Usar access control: uniform
Quitar a los viewers los permisos para ver este bucket (puede contener información sensible)
Darle permiso a la service account que estemos usando como "Storage object admin"

Activar el versionado (backup del estado):
gsutil versioning set on gs://NOMBREBUCKET
