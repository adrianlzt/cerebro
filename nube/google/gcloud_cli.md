https://cloud.google.com/sdk/gcloud/reference

Para temas de cloud storage se usa otra cli: gsutil

Para configurarlo:
gcloud init


Ver estado actual:
gcloud info


gcloud organizations list
gcloud projects list


Cmabiar proyecto por defecto:
gcloud config set project my-project


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



# GKE
Listar clusters
gcloud container clusters list


Regional cluster vs Zonal cluster
https://stackoverflow.com/a/57793374

Por defecto, single compute zone, pero puedes hacer que sea multi-zona (misma región) o multiregión


Configurar cluster GKE
https://cloud.google.com/kubernetes-engine/docs/quickstart
gcloud container clusters get-credentials cluster-name
