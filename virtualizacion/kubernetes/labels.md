Nos permiten identificarlos y darles características, por ejemplo, los que tienen ssd.

Añadir
kubectl label node NOMBRENODO foo.bar/xxx=abc

Quitar
kubectl label pods NOMRERECURSO nombretag-


Se pueden añadir a nivel de namespace
kubectl label namespace default istio-injection=enabled

Mostrar labels globales del namespace "istio"
kc label namespace istio --list

Mostrar labels de todos los namespaces:
kc label namespace --list --all
