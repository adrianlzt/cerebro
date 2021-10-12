https://cloud.google.com/iam

Gestión de identidades y accesos.


# Roles
Si queremos ver los roles disponibles y que permisos dan cada uno (para ver los permisos pinchar sobre la línea del rol y lo muestra en la tarjeta de la derecha)
https://console.cloud.google.com/iam-admin/roles

# Dar permisos a usuarios/SA
https://console.cloud.google.com/iam-admin/iam
Pulsar sobre ADD
Selecionar el usuario (usando su email) y el/los permisos.

Con gcloud:
https://cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding
gcloud projects add-iam-policy-binding PROYECTO --member='serviceAccount:tools-vm@PROYECTO.iam.gserviceaccount.com' --role='roles/artifactregistry.reader'


# Service accounts
https://cloud.google.com/iam/docs/service-accounts
https://cloud.google.com/iam/docs/creating-managing-service-account-keys

Una cuenta de servicio es un tipo especial de cuenta que usa una aplicación o una instancia de máquina virtual (VM), no una persona. Las aplicaciones usan cuentas de servicio para realizar llamadas autorizadas a la API,


Las VMs usan por defecto la service account "Compute Engine default service account"

Podemos dar acceso a esa service account, por ejemplo, a un object storage.


## Acceso desde una VM
curl "http://metadata/computeMetadata/v1/instance/service-accounts/default/token" -H "X-Google-Metadata-Request: True"

Nos devuelve un token que podemos usar para llamar a las APIs:
curl -H "Authorization: Bearer ACCESS_TOKEN_DEL_JSON" ...

