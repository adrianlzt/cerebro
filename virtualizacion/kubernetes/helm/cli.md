helm search foo
  buscar charts en el repo publico

helm fetch xxx
  bajarnos el .tgz de un chart

helm install somedir
  instalar un chart
  --name foo
    darle un nombre, si no, cogerá uno random
  --values=other.yaml
    usar otro fichero en vez del values.yml
  --description "asdad"
    crear la release con una descripción

helm upgrade releaseName chartPath
  --install: si no existe una releas con este nombre, crearla

helm lint mychart
  buscar problemas de linting

helm package mychart
  generar el .tgz



helm list --all
  muestra los charts desplegados
  sin --all solo muestra las "DEPLOYED"

helm status FOO
  estado de un deploy, fecha, namespace, status y el NOTES.txt



# Dependencias
helm dep up
helm dependency update
  bajar las deps definidas en requirements.yaml

requirements.yaml (CUIDADO! es .yaml no .yml)
dependencies:
  - name: apache
    version: 1.2.3
    repository: http://example.com/charts
  - name: mysql
    version: 3.2.1
    repository: "@stable"
    alias: new-subchart-2

Tambien se les pueden poner tags y conditions

https://github.com/helm/helm/blob/master/docs/charts.md#operational-aspects-of-using-dependencies
Al definir dependencias, cuando instalemos nuestro chart, también se instalarán las dependencias.


Podemos pasar variables desde el chart padre a los hijos en el fichero values.yml
mysql:
  max_connections: 100 # Sent to MySQL
  password: "secret"



# Plugins
https://github.com/appscode/chartify
Generate Helm charts from existing Kubernetes resources

Helmfile - Helmfile is a declarative spec for deploying helm charts

Monocular - Web UI for Helm Chart repositories

VIM-Kubernetes - VIM plugin for Kubernetes and Helm
