https://www.elastic.co/solutions/apm
https://www.elastic.co/blog/elastic-apm-beta-released

Cargar una libreria en nuestro código que enviará métricas a ES (pasando primero por el apm server) por donde vaya yendo el código, tiempos, etc

Soporta Node.js, python, ruby, javascrip (RUM=Real User Monitoring, cliente) (java y go en un futuro)


La organización del APM se hace al rededor de transactions y errors.
Las transactions pueden tener uno o varios spans.
Ejemplo, nos hacen una petición a nuestro servidor web (esta sería la transacción) y para contestar a esta tenemos que realizar dos llamadas a la bbdd y una llamada externa; estas tres serían un span dentro de la transacción.

Las transacciónes tienen varios parámetros:
 - type (generalmente "Requests"). Tendremos una pestaña por cada tupo de transaction type
 - name (para los servers http suelen poner "GET /path")
 - context
 - user context (id, username, email)
 - result
 - tags
 - url (como se define esto?)
Tenemos dos conceptos distintos en una transacción, uno es el nombre que pasamos cuando se ejecuta begin_transaction, parece que este suele tomar el valor "Requests".
Cada tipo de transa
Cada nombre distinto de transacción aparecerá como una pestaña distinta en Kibana-APM (típicamente tendremos "Requests" y "Errors")

Parece que aunque tengamos una transaction type distinta, luego la UI los agrupa por name. Por lo que podemos ver transactions en una tab (type) que no es la suya (bug?)


# Server
docker run -d --name apm-server -v "$PWD/apm-server.yml:/usr/share/apm-server/apm-server.yml" -p 8200:8200 docker.elastic.co/apm/apm-server:6.3.0

Ejemplo de config corriendo como container (referencia https://github.com/elastic/apm-server/blob/6.3/apm-server.reference.yml):
apm-server.host: "0.0.0.0:8200"
output.elasticsearch.hosts: ["http://172.17.0.1:9200"]
setup.kibana.host: "172.17.0.1:5601"
setup.dashboards.enabled: true
frontend.enabled: true



# Client
## Python
pip install elastic-apm[flask]

Ejemplos:
  apm_flash.py

Cuidado! Si tenemos el modo debug (variable de entorno FLASK_DEBUG=1) no enviará métricas


En caso de perdida de conex con el server APM se perderán esas trazas. Parece que la libreria no cachea, al menos con la config por defecto.
Saldrán unos errores indicando que no ha podido enviar los datos:
Connection to APM Server timed out (url: http://localhost:8200/v1/transactions, timeout: None seconds)
Failed to submit message: '<no message value>'
<no message value>



Las opciones se pueden pasar por variables de entorno. Mirar conf/__init__.py "class Config" (hay que prefijar con "ELASTIC_APM_")
Ejemplo con variables de entorno:
ELASTIC_APM__WAIT_TO_FIRST_SEND=0 ELASTIC_APM_SERVICE_NAME=Desdeenv ELASTIC_APM_FLUSH_INTERVAL=1 python apm_custom.py
  configurando para no esperar el envio de la primera transacion y flushear cada segundo


Configurando desde el codigo:
client = elasticapm.Client(
    {
        "FLUSH_INTERVAL": 1,
        "_WAIT_TO_FIRST_SEND": 0
    },
    service_name='PruebasConfig',
)

elasticapm.instrument()  # instrumentar librerias conocidas


El codigo importante a nivel cliente está en elasticapm/traces.py

El codigo para instrumentar diferentes librerias está en: elasticapm/instrumentation/packages (https://github.com/elastic/apm-agent-python/tree/master/elasticapm/instrumentation/packages)
Si por ejemplo llamamos a la lib "requests", las llamadas automáticamente serán spans dentro de la transacción.


### Public API
https://www.elastic.co/guide/en/apm/agent/python/2.x/api.html#api-tag

Mirar ejemplo de uso libre de la lib de APM en: apm_custom.py

#### custom transaction
client.begin_transaction("spans1")
elasticapm.set_custom_context({"cosas": "datos_custom"})
elasticapm.set_user_context(username="pepe", email="pepe@example.com", user_id="abc")
elasticapm.tag(tag1="value1", tag2="value2")
...spans...
client.end_transaction("trans_name", "result")


#### custom span
Si queremos generar span custom dentro de una transacción, se calculará el tiempo de ejecucción de lo que pongamos dentro del "with":
from elasticapm.traces import capture_span
...
with capture_span(name="mifirma", span_type="some.type", extra={"url": "miurl"}, skip_frames=0, leaf=False):
  edad = mifunc(1)

El diccionario se almacenará "extra" como context (estará disponible en el doc indexado como context.url en este caso)


#### exceptions (van a la pestaña "Errors")
try:
    x = int("five")
except ValueError:
    client.capture_exception()



#### messages (van a la pestaña "Errors")
client.capture_message(param_message={
    'message': 'Billing process for %s succeeded. Amount: %s',
    'params': ("customer.id", "order.total_amount"),
  },
  custom={
    "foo": "bar"
  }
)



## RUM - JS
https://www.elastic.co/guide/en/apm/agent/js-base/current/index.html
https://github.com/elastic/apm-server/blob/master/docs/configuration-rum.asciidoc

npm install elastic-apm-js-base --save
Meter este codigo en nuestro JS:
import { init as initApm } from 'elastic-apm-js-base'
var apm = initApm({

  // Set required service name
  // (allowed characters: a-z, A-Z, 0-9, -, _,
  // and space)
  serviceName: '',

  // Set custom APM Server URL (
  // default: http://localhost:8200)
  serverUrl: '',

  // Set service version (required for sourcemap
  // feature)
  serviceVersion: ''
})


Tenemos que agregar config al apm server:
apm-server.rum.enabled: true
apm-server.rum.allow_origins: ['*']
#apm-server.rum.rate_limit: 10
#apm-server.rum.library_pattern: "node_modules|bower_components|~"
#apm-server.rum.exclude_from_grouping: "^/webpack"
#apm-server.rum.source_mapping.cache.expiration: 5m
#apm-server.rum.source_mapping.index_pattern: "apm-*-sourcemap*"






# Tests
https://www.elastic.co/guide/en/apm/agent/python/current/run-tests-locally.html


# Errores
elasticapm.transport.base.TransportException: HTTP 400: data validation error: Problem validating JSON document against schema: I[#] S[#] doesn't validate with "transaction#"                                     

Estamos pasando algun parametro mal. Podemos inspeccionar con wireshark el puerto 8200 para ver que pasa
