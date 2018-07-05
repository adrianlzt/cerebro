https://www.elastic.co/solutions/apm
https://www.elastic.co/blog/elastic-apm-beta-released

Cargar una libreria en nuestro código que enviará métricas a ES (pasando primero por el apm server) por donde vaya yendo el código, tiempos, etc

Soporta Node.js y python (ruby, javascript, java y go en un futuro)


La organización del APM se hace al rededor de transactions y errors.
Las transactions pueden tener uno o varios spans.
Ejemplo, nos hacen una petición a nuestro servidor web (esta sería la transacción) y para contestar a esta tenemos que realizar dos llamadas a la bbdd y una llamada externa; estas tres serían un span dentro de la transacción.


# Server
docker run --rm -d -v "$PWD/apm-server.yml:/usr/share/apm-server/apm-server.yml" -p 8200:8200 docker.elastic.co/apm/apm-server:6.3.0

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

Los hooks para las diferentes librerias está en: elasticapm/instrumentation/packages
La idea es hacer wrappers de ciertas llamadas con "capture_span" para enviar los datos a APM.

Si por ejemplo llamamos a la lib "requests", las llamadas automáticamente serán spans dentro de la transacción.


### custom span
Si queremos generar span custom dentro de una transacción, se calculará el tiempo de ejecucción de lo que pongamos dentro del "with":
from elasticapm.traces import capture_span
...
with capture_span(name="mifirma", span_type="some.type", extra={"url": "miurl"}, skip_frames=0, leaf=False):
  edad = mifunc(1)


El diccionario se almacenará "extra" como context (estará disponible en el doc indexado como context.url en este caso)
