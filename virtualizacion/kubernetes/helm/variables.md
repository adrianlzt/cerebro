https://docs.wire.com/understand/helm.html

Si pasamos un fichero de variables (-f foo.yaml), solo se verán modificadas las keys explicitamente modificadas.

cassandra-ephemeral:
  resources:
    requests:
      cpu: "2"

Este yaml solo modificará la key 'cpu'.
Podríamos pensar que estamos "destruyendo" el resto de campos de los diccionarios que nombramos.


# Built-in objects
https://helm.sh/docs/chart_template_guide/builtin_objects/

Variables que siempre tienen un valor determinado, por ejemplo:
.Release.Namespace
