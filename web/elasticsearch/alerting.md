https://www.elastic.co/guide/en/x-pack/current/watcher-getting-started.html
https://github.com/Yelp/elastalert
https://elastalert.readthedocs.io/en/latest/

La solución oficial es Watcher del X-Pack (de pago)
Una versión gratuita es elastalert de Yelp

Comparación: https://www.elastic.co/guide/en/x-pack/current/watcher-getting-started.html



# elastalert
Escrito en python2

Se lanzan queries cada cierto tiempo contra ES y se pasan por una serie de reglas.
Si se hace match en alguna regla, se activan las alarmas asociadas.

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
