https://www.elastic.co/guide/en/x-pack/current/watcher-getting-started.html
https://github.com/Yelp/elastalert
https://elastalert.readthedocs.io/en/latest/

La solución oficial es Watcher del X-Pack (de pago)
Una versión gratuita es elastalert de Yelp

Comparación: https://www.elastic.co/guide/en/x-pack/current/watcher-getting-started.html


# bosun
Permite lanzar queries contra ES y generar alarmas (email, o http request)
Mirar monitorizacion/bosun.md


# elastalert
Escrito en python2

Se lanzan queries cada cierto tiempo contra ES y se pasan por una serie de reglas.
Si se hace match en alguna regla, se activan las alarmas asociadas.
Entre las reglas y los alerts se pueden meter "enhancements", modulos custom en python para modificar lo que se pasará al alerter.

Hay distintos tipos de reglas: frenquency, spike, flatline, blacklust/whitelist, any y change
Alerts tienen los tipicos chat ops, emails, jira, comando.
Se pueden crear reglas y alerts custom (https://elastalert.readthedocs.io/en/latest/recipes/adding_rules.html#writingrules https://elastalert.readthedocs.io/en/latest/recipes/adding_alerts.html#writingalerts)

También tiene otras funcionalidades como:
  links a las alertas en kibana
  agregaciones en campos arbitrarios
  combinar alertas en reportes periodicos
  etc

Los datos indexados tienen que tener un timestamp, que se usará para saber de cuando es cada documento.
Por defecto se buscará el field "@tiemstamp" con el formato de fecha por defecto.


## install
Usar python 2

pip install elastalert

Si usamos ES 2.x tendremos que instalar esa versión de pip:
pip install "elasticsearch<3.0.0"


## config
Fichero config.yml donde configuramos el acceso a ES, cada cuanto ejecutarse, como hacer las agregaciones, a donde notificar, etc

Fichero de ejemplo de config
https://raw.githubusercontent.com/Yelp/elastalert/master/config.yaml.example

Generalmente tendremos un dir rules/ con los ficheros .yaml de las distintas reglas

Será necesario crear a priori el índice (por defecto elastalert_status) y los mappings que usará elastalert:
elastalert-create-index


## Rules

Tipos: https://elastalert.readthedocs.io/en/latest/ruletypes.html#rule-types
  Any: cualquier match genera una alerta
  Blacklist: chequear un campo determinado contra una lista de valores, si hay match, salta alerta
  Whitelist: salta alerta si un campo no está en la whitelist
  Change: salta si un campo determinado cambia de valor
  Frequency: si hay más de N trazas en un tiempo X
  Spike: si en una ventana de tiempo determinada hay muchos más eventos que en la ventana anterior
  Flatline: si el número de eventos car por debajo de un límite durante un tiempo
  New Term: si para un field determinado aparece un nuevo valor, salta alerta
  Cardinality: si el número de valores distintos es superior/inferior a un valor
  Metric Aggregation: se agregan los valores de un field para un determinado tiempo y se compara con un threshold
  Percentage Match: si el número de documentos en un periodo determinado es superior/inferior a un porcentaje


Ejemplo de un rule basico:
name: Example rule
type: frequency
index: test
num_events: 5
timeframe:
    minutes: 1
alert:
- "debug"



Testear una alerta (obtendrá del índice los datos de las últimas 24h):
elastalert-test-rule rules/freq.yaml


Podemos poner filtros para solo buscar determinado contenido.
Lo haremos usando filter y luego meteremos directamente el DSL de ES
filter:
  - term:
      city: "madrid"

Otro ejemplo:
filter:
  - query_string:
      query: "\"por ejemplo\""





## Enhancements
https://elastalert.readthedocs.io/en/latest/recipes/adding_enhancements.html#enhancements

Modulos en python que recibiran las trazas que han hecho match en alguna regla para tratarlas antes de enviarlas a los alerters.




## Alerts
https://elastalert.readthedocs.io/en/latest/ruletypes.html#alerts

Como avisaremos del problema.

Podemos usar variables del match. Ejemplo:
alert:
  - command
command: ["/bin/send_alert", "--username", "%(username)s"]
