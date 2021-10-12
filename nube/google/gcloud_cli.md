https://cloud.google.com/sdk/gcloud/reference

Para temas de cloud storage se usa otra cli: gsutil

Para configurarlo:
gcloud init

Ver estado actual:
gcloud info

gcloud organizations list
gcloud projects list

APIs activas para el proyecto:
gcloud services list --available

Cmabiar proyecto por defecto:
gcloud config set project my-project


# Configuración de cuenta
Mostrar las que tenemos configuradas:
gcloud config configurations list

Crear nueva:
gcloud config configurations create config-name
gcloud config set account my-account@example.com
gcloud config set project my-project-id
gcloud auth login


# Usar una Service account con gcloud
https://serverfault.com/a/849910

Set CLOUDSDK_CONFIG to some temp directory
gcloud auth activate-service-account --key-file=...
... use gcloud to do your work ...
Remove temp CLOUDSDK_CONFIG directory.


# Compute
Listar VMs:
gcloud compute instances list

Acceder por ssh:
gcloud compute ssh dev

Levantar un tunel (puerto local contra puerto remoto de la VM, necesita acceso de los servers de IAP a nuestra vm https://stackoverflow.com/a/58899863):
gcloud compute start-iap-tunnel NombreVM 8080
gcloud compute start-iap-tunnel NombreVM 8080 --local-host-port=localhost:5601

Otra forma, mediante tunel ssh:
gcloud compute ssh NombreVM -- -N -L 5601:localhost:5601


Copiar fichero
gcloud compute scp ...

Parar VM:
gcloud compute instances stop tools --zone=us-east1-b

Arrancar VM:
gcloud compute instances start tools --zone=us-east1-b



# GKE
Listar clusters
gcloud container clusters list


Regional cluster vs Zonal cluster
https://stackoverflow.com/a/57793374

Por defecto, single compute zone, pero puedes hacer que sea multi-zona (misma región) o multiregión


Configurar cluster GKE
https://cloud.google.com/kubernetes-engine/docs/quickstart
gcloud container clusters get-credentials cluster-name
