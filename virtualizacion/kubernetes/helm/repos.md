Podemos bajar/buscar charts de repos con la cli.
chartmuseum.md server de repos


helm repo list
  mostrar los repos que tenemos configurados

helm3 repo add stable https://kubernetes-charts.storage.googleapis.com
helm3 repo add elastic https://helm.elastic.co

Si queremos obtener a mano el índice de un repo:
https://repo.com/index.yaml


# OCI repos
Usar "OCI registries" (registros de contenedores de docker) como almacen de helms.


# Package
helm --debug package --version CHART_VERSION CHART_PATH

Pushear a un OCI registry:
helm push CHART_NAME_CHART_VERSION.tgz oci://asia-northeast1-docker.pkg.dev/PROJECT_ID/REGISTRY_NAME
