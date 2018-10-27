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

helm lint mychart
  buscar problemas de linting

helm package mychart
  generar el .tgz


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
