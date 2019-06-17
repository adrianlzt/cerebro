https://www.elastic.co/guide/en/x-pack/5.6/xpack-introduction.html
X-Pack is an Elastic Stack extension that bundles security, alerting, monitoring, reporting, and graph capabilities into one easy-to-install package

Prior to Elasticsearch 5.0.0, you had to install separate Shield, Watcher, and Marvel plugins to get the features that are bundled together in X-Pack

Gratuito a partir de 6.3:
monitoring, tile maps, Grok Debugger, and Search Profiler


Lo que provee:
 - security
 - alerting
 - monitoring
 - reporting
 - graph capabilities
 - machine learning

# Install
./elasticsearch/bin/elasticsearch-plugin install x-pack
arrancar elasticsearch
./elasticsearch/bin/x-pack/setup-passwords interactive
  definir password para elastic, kibana, logstash_system (ya no hay password por defecto, a partir de 6.x)
  el user kibana parece que se encarga de precrear cosas, como los dashboards para los beats

./kibana/bin/kibana-plugin install x-pack
Configuramos kibana con el user:password que hemos definido antes
vi config/kibana.yml
elasticsearch.username: "kibana"
elasticsearch.password: "kibanapassword"

./logstash/bin/logstash-plugin install x-pack
vi logstash.yml
xpack.monitoring.elasticsearch.password: logstashpassword


El pack completo es de pago! A partir de 6.3.x hay partes gratuitas
Dan 30 días de prueba
https://www.elastic.co/guide/en/x-pack/5.6/license-expiration.html

Tabla con lo que ofrece cada tipo de licencia y que tiene la gratuita
https://www.elastic.co/subscriptions

En resumen, hay un tipo de licencia "Basic" gratuita que parece que tiene Monitoring, el resto de cosas es de pago.


# Security
https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html
https://www.elastic.co/guide/en/elasticsearch/reference/6.0/security-api.html

Gold/Platinum
- authentication/authorization
- role-based access control
- document-level and field-level security
- encryption of data between nodes
- audit logging
- supports SAML, LDAP, Active Directory, PKI, etc (OAuth and Kerberos in development, Jun'18)

Gestionar usuarios, roles, etc se hace desde Kibana.
Management -> Security

A partir de 6.x se require poner una password tras instalar X-Pack. No hay password por defecto (antes era changeme)


## Crear user admin
curl -u elastic:elastic 172.16.10.18:9200/_xpack/security/user/beats -d '{"password" : "beats123", "roles" : [ "admin"]}'

## Quien somos y nuestros permisos
curl -u user:pass 'localhost:9200/_xpack/security/_authenticate?pretty'


Un caso típico es crear roles que solo den acceso a un índice, o conjunto de ellos.
Le daremos index privileges: read, read_cross_cluster, view_index_metadata, and monitor
Luego crearemos usuarios y les pondremos ese rol y el de kibana_user.


Si intentamos ejecutar algún curl no permitido nos dará error especificando que permisos nos faltan.



# Monitoring
Cada 10" (por defecto) ES recoge métricas sobre su funcionamiento y las almacena en el propio ES.
Gratuito para un solo cluster. Para varios clusters es de pago.

Lo recomendado es usar un cluster dedicado para monitorizar:
  reduce the load and storage on your other clusters
  access to Monitoring even when other clusters are unhealthy
  separate security levels from Monitoring and production clusters

Tendremos que configurar el cluster a monitorizar donde tiene que enviar las métricas.
xpack.monitoring.exporters:
  id1:
    type: http
    host: ["http://monitoring_cluster:9200"]
    auth.username: username
    auth.password: changeme

Debería ser suficiente un cluster de un único nodo. 3 nodos si necesitamos HA para la monitorización
Generalmente con 7 días de datos tendremos suficiente.


Parámetros que tal vez queramos modificar (https://www.elastic.co/guide/en/x-pack/current/monitoring-settings.html):

xpack.monitoring.collection.indices
The indices to collect data from. Defaults to all indices, but can be a comma-separated list.

xpack.monitoring.collection.interval
How often data samples are collected. Defaults to 10s

xpack.monitoring.history.duration
How long before indices created by Monitoring are automatically deleted. Defaults to 7d
Si se está monitorizando en otro cluster, tendremos que gestionar allí el borrado de los índices viejos. Este param solo se hace automáticamente si estamos en el mismo cluster.




# Alert
watch for changes or anomalies in your data and
perform the necessary actions in response

Lo más sencillo es manejarlos con la UI de kibana.
Make sure to create users with Watcher specific roles
  watcher_admin can perform all watcher-related actions
  watcher_user can view all existing watches

Ejemplos:
 Monitor when the number of tweets and posts in an area exceeds a threshold of significance, notify a service technician
  Open a helpdesk ticket when any servers are likely to run out of free space in the next few days
  Track network activity to detect malicious activity, and proactively change firewall configuration to reject the malicious user
  Send immediate notification if nodes leave the cluster or query throughput exceeds an expected range


Partes los "Watches":
  Trigger: cuando debe saltar
  Input: carga datos en el watch payload
  Condition: controla cuando el watch debe ejecutar las actions
  Transform: procesar los datos
  Actions: enviar un email, etc

Ejemplo, cada 5m mira si hay alguna cadena en "body" que contenga "error", si es cierto, mete una traza en los logs:
PUT _xpack/watcher/watch/log_error_watch{
  "trigger": {
    "schedule": {
      "interval": "5m"
    }
  },
  "input": {
    "search": {
      "request": {
        "indices": [
          "logs*"
        ],
        "body": {
          "query": {
            "match": {
              "message": "error"
            }
          }
        }
      }
    }
  },
  "condition": {
    "compare": {
      "ctx.payload.hits.total": {
        "gt": 0
      }
    }
  },
  "actions": {
    "log_error": {
      "logging": {
        "text": "Found {{ctx.payload.hits.total}} errors."
      }
    }
  }
}


Loswatches se almacenan en ES:
GET .watches/doc/log_error_watch
GET .watches/_search

Registro de todos los watches ejecutados:
GET .watcher-history*/_search{
  "sort": [
    {
      "result.execution_time": "desc"
    }
  ]
}
