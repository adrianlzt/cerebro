# Subcharts
https://helm.sh/docs/chart_template_guide/subcharts_and_globals/

Meter charts debajo de nuestro chart principal.

appA/
  charts/
    subAppB/
    subAppC/
  Chart.yaml
  templates/
  values.yaml

Para crear subcharts ejecutar "helm create foo" dentro del dir charts/

Consideraciones sobre la organización con subcharts:
 - A subchart is considered "stand-alone", which means a subchart can never explicitly depend on its parent chart. For that reason, a subchart cannot access the values of its parent.
 - A parent chart can override values for subcharts.
 - Helm has a concept of global values that can be accessed by all charts.

Parece que no se pueden pasar variables puestas en el parent a los child
https://github.com/helm/helm/issues/6699

Una posible alternativa, usar https://github.com/helmfile/helmfile

## Values
``{{ .Values.foo }}`` en un subchart se referirá al values.yaml de ese subchart.

### Override
Desde el values.yaml del chart principal podemos modificar variables de los subcharts:
```
subAPPB:
  foo: bar```

### Global
En el values.yaml del chart principal:
```
global:
  foo: bar
`````
Se debe acceder en el chart y subcharts como:
```
{{ .Values.global.foo }}```


### Templates
https://helm.sh/docs/chart_template_guide/subcharts_and_globals/#sharing-templates-with-subcharts
Se pueden compartir templates ya que son globales.



# Dependencies
https://helm.sh/docs/helm/helm_dependency/

Que nuestro chart dependa de otros charts.
Al ejecutar la instalación, esos charts serán metidos en charts/

Chart.yaml
spec del fichero: https://helm.sh/docs/topics/charts/#the-chartyaml-file
```
dependencies:
- name: nginx
  version: "1.2.3"
  repository: "https://example.com/charts"
- name: memcached
  version: "3.2.1"
  repository: "https://another.example.com/charts"
- name: nginx
  version: "1.2.3"
  repository: "file://../dependency_chart/nginx"
- condition: mariadb.enabled
  name: mariadb
  repository: https://charts.bitnami.com/bitnami
  version: 11.x.x
- name: nginx
  version: "1.2.3"
  repository: "file://../dependency_chart/nginx"
  alias: second_nginx


En el penúltimo ejemplo tenemos una dependencia con un condicional
En el último por si queremos tener un segundo chart del mismo tipo.
