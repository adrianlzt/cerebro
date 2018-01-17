Parte del X-Pack (de pago)
Es el elemento de Elastic que se encarga de mirar las trazas almacenadas en ES y lanzar alarmas.

Podemos configurarlo desde Kibana o usando la API:
http://localhost:5601/app/kibana#/management/elasticsearch/watcher/watches/?_g=()

Crear alarmas desde la interfaz web está bastante limitado.
Los triggers solo me deja hacerlos sobre valores numéricos.
En las acciones por ejemplo solo podemos enviar email, generar una nueva trazas o enviar un mensaje de Slack.

Tambien podemos usar el método "raw" que nos rellena ya un JSON típico y nos deja hacer pruebas.
Si queremos que salte el trigger en las pruebas de verdad recordar cambiar el Action a "Execute"
En la simulación, los overrides son para modificar el resultado que ha llegado. Por ejemplo, ponemos un JSON que dice que si ha encontrado 4 resultados (tenemos un botón para copiar la última respuesta)


Ejemplos:
https://github.com/elastic/examples/tree/master/Alerting


# Configuration
Un Watch constará de tres partes principales:
 - un búsqueda (input) programada cada x tiempo (trigger)
 - unas condiciones que hacen saltar la alarma (condition)
 - unas acciones que ejecutar en caso de que salte la alarma (actions)


## Triggers
https://www.elastic.co/guide/en/x-pack/current/trigger.html
Cada cuanto debe lanzarse la búsqueda

Ejemplo de trigger:
  "trigger": {
    "schedule": {
      "interval": "10s"
    }
  },



## Inputs
https://www.elastic.co/guide/en/x-pack/current/input.html

Podemos poner un input "simple", datos estáticos que podemos usar, por ejemplo, para rellenar lo que haremos en el actions (por ejemplo el email de alguien al que queremos avisar)

"search" hace una búsqueda sobre ES, será lo que típicamente usaremos. Recordar meter un límite del tiempo donde debemos buscar para no hacerlo sobre todo el índice a cada vez.

"HTTP input", podemos lanzar queries contra cualquier cosa que exponga una API http. Otros cluster ES, otras APIs de ES, otro servicio distinto (por ejemplo, el tiempo que hace)

"chain", unir varios inputs. Por ejemplo, consultar una api externa y según eso hacer una búsqueda en nuestro ES.


Ejemplo de búsqueda (indice logstash-*, últimos 100m y que encuentre la palabra "acaban"):
  "input": {
    "search": {
      "request": {
        "body": {
          "size": 0, // ESTO es para que no me devuelva los resultados en hits.hits[]
          "query": {
            "bool": {
                "must": [
                    {
                         "query_string": {
                            "query": "acaban"
                          }
                    },
                    {
                      "range": {
                        "@timestamp": {
                          "gte": "now-100m"
                        }
                      }
                    }
                ]
            }
          }
        },
        "indices": [
          "logstash-*"
        ]
      }
    }
  },



## Conditions
https://www.elastic.co/guide/en/x-pack/current/condition.html

Bajo que condiciones debe saltar la alarma. Por ejemplo, si hay al menos un hit, o si el valor en media es superior a N.

Ejemplo de cuando haya más de un hit:
  "condition": {
    "compare": {
      "ctx.payload.hits.total": {
        "gte": 1
      }
    }
  },


## Actions
https://www.elastic.co/guide/en/x-pack/current/actions.html

Las acciones que puede tomar cuando salta un trigger.

Ejemplo de webhook:
  "actions": {
    "my-webhook": {
      "webhook": {
        "method" : "POST",
        "url" : "https://requestb.in/19o2f041",
        "body": "{\"hola\":123}"
      }
    }
  }
