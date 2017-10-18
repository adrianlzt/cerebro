https://github.com/openshift/origin-aggregated-logging

Los containers corren en docker con el log-driver journald (configurable? si usa el driver json fluentd tambien lo captura)
Fluentd (version 0.12.32 para openshift 3.5) coge los logs de los pods de journald, les añade cierta metadata y lo almacena en ElasticSearch.
Los pods de fluentd se despliegan con un DaemonSet en el project logging.
Kibana muestra los datos almacenados en ElasticSearch (dentro del pod de kibaba hay otro container para gestionar el login).
Curator: automáticamente borra índices antiguos según proyecto. Mirar config con el "oc dc logging-curator"




# Fluentd
https://hub.docker.com/r/openshift/origin-logging-fluentd/
Dockerfile: https://github.com/openshift/origin-aggregated-logging/tree/master/fluentd

Al arrancar al pod se ejecutará el script run.sh que a su vez llamará a generate_throttle_configs.rb para generar la configuración dinámica necesaria.

Flow de como funciona: https://github.com/openshift/origin-aggregated-logging/blob/master/docs/mux-logging-service.md#basic-flow

INPUT
 - leer de /run/log/journal, configs.d/dynamic/input-syslog-default-syslog.conf
 - fichero de posicion en /var/log/journal.pos
FILTROS
 - se excluyen los logs de debug (configs.d/openshift/filter-exclude-journal-debug.conf)
 - se reescribe CONTAINER_NAME para organizarlos si son de infraestructura, logging, fluentd, generales o fuera de openshift
 - se usa el plugin kubernetes_metadata para agregar más datos a los logs
 - se limpian ciertos campos de los logs de kibana? configs.d/openshift/filter-kibana-transform.conf
 - ciertas adaptaciones de los logs, configs.d/openshift/filter-k8s-record-transform.conf configs.d/openshift/filter-syslog-record-transform.conf
OUTPUT
 - un output por si tenemos configurado un ES especial para las operaciones (index: .operations.)
 - output general para las apps: configs.d/openshift/output-applications.conf (index: project.)
   - configs.d/openshift/output-es-config.conf fichero donde se configura elasticsearch_dynamic como output
     - flush_interval 5s
     - max_retry_wait 300.
     - disable_retry_limit
     - sin buffers
   - otros includes que podrian configurarse para definir otros outputs

 - Podemos meter outputs custom en el config map logging-fluentd.
    Los ficheros de ese config map se montaran sobre /etc/fluent/configs.d/user y se usarán en los outputs como:
    @include ../user/output-extra-*.conf
    @include ../user/secure-forward.conf


Se puede activar la monitorización de los agentes (http://docs.fluentd.org/v0.12/articles/monitoring) con la variable ENABLE_MONITOR_AGENT
Se puede activar el debug de los agentes (http://docs.fluentd.org/v0.12/articles/monitoring#debug-port) con la variable ENABLE_DEBUG_AGENT

En la version 3.5.0 del contenedor (sha cbe5aa17d69e) de fluent, el plugin de output para ES no tiene configurado el parámetro request_timeout, por lo que se pone por default a 5".
Esto implica que si ES no contesta en 5", el plugin da por malo el envío y reintenta pushear los datos, logrando entradas duplicadas.
En este commit (https://github.com/openshift/origin-aggregated-logging/commit/bb44098634dc4c83ea8fe90b79155a17d91867c1) se aumenta ese valor hasta los 600"





# Splunk
Montar un fluentd nuestro que escuche las peticiones de las llamadas de los agentes fluentd y reenvie los logs a splunk.
Hace falta modificar el DaemonSet de fluentd para añadirle un redireccionador (buscar como hacer secure-forward).
https://github.com/parolkar/fluent-plugin-splunk
https://docs.openshift.com/container-platform/3.4/install_config/aggregate_logging.html


# Troubleshooting
https://github.com/openshift/origin-aggregated-logging/blob/master/docs/checking-efk-health.md
https://docs.openshift.com/enterprise/3.2/install_config/aggregate_logging.html#aggregate-logging-performing-elasticsearch-maintenance-operations

https://github.com/openshift/origin-aggregated-logging/blob/master/hack/logging-dump.sh
Este script recolecta información sobre el cluster de logging: https://github.com/openshift/origin-aggregated-logging/blob/master/hack/README-dump.md#logging-dump



# Elasticsearch
Las imagenes cuando arrancan lanzan el script /opt/app-root/src/run.sh que hace las operaciones
 - definir la memoria con la que correrá ES. Ejemplo: ES_JAVA_OPTS="-Dmapper.allow_dots_in_name=true -Xms4096m -Xmx4096m"
 - arranca ES con --security.manager.enabled false
 - espera hasta que el puerto conteste
 - configura el SearchGuard (/usr/local/bin/es_seed_acl)
   - ejecuta el sgadmin.sh con la conf de /opt/app-root/src/sgconfig
 - carga los templates que están en: /usr/share/elasticsearch/index_templates/*.json
   - son los mappings de los indices, uno para operations y otro para el resto de projects


## Config
/usr/share/java/elasticsearch/config/
Configuración de shards y replicas en el ansible de despliegue. Creo que por defecto es 1 shard y 0 replicas (PELIGROSO, se pierde un nodo y se pierden datos)


### SearchGuard
Gestion de HTTPS y autenticación.
Script de administración:
/usr/share/java/elasticsearch/plugins/openshift-elasticsearch/sgadmin.sh
Indices: .searchguard.${HOSTNAME}

En la conf se define que el user CN=system.admin,OU=OpenShift,O=Logging es el único administrador.
Cuando se accede al cluster usando los certs, el admin-cert tiene como Subject esa clave

Config de SearchGuard (aplicada en el arranque): /opt/app-root/src/sgconfig



## Organización de los indices
Tendremos un index ".operations.YYYY.MM.DD" donde se almacenarán las trazas de los services de openshift (proyectos "default", "openshift", "openshift-infra").
  Lo que se guarda en estos indices son los logs de ese dia UTC

Otro de .kibana (interno entiendo).

.searchguard, uso?

.project.XXX.UUID... logs de cada proyecto (aunque no veo los de openshift-infra ni default)


## Conectar al elastic

oc project logging
oc rsh <elastic_pod>
curl --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/"

Estado cluster:
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_cluster/health?pretty"

Indices de kibana (cortando parte de las fechas):
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_aliases/?pretty" | grep -v -e aliases -e "\s*}" | cut -d '.' -f 1,2,3 | sort | uniq | tr -d '"{:'

Settings de todos los indices:
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_all/_settings?pretty" |more

Consumo de un indice por host (cuenta número de documentos para un índice por hostname):
curl -s --cacert admin-ca --cert admin-cert --key admin-key "https://localhost:9200/.operations.2017.10.01/_search" -d '{"fields":["aggregations"], "aggs": {"genres": {"terms": {"field":"hostname"}} }}' | jq '.aggregations.genres.buckets'


Los certificados los podemos sacar de etcd (en base64)
etcdctl2 get /kubernetes.io/secrets/logging/logging-elasticsearch
Aqui estarán los tres:
 - data.admin-ca
 - data.admin-cert
 - data.admin-key


Para acceder desde fuera podemos bajarnos los certificados y crear un tunel ssh a traves de un nodo del cluster de openshift.
Para copiar los certs lo más sencillo es usar oc rsh y copiar el contenido de los ficheros.
El tunel (siendo 172.30.17.5:9200 el service del cluster de ES):
ssh -f -L 9200:172.30.17.5:9200 openshift-algun-nodo-del-cluster -NT
curl -s --key admin-key --cert admin-cert --cacert admin-ca https://localhost:9200/_cluster/health

### Exponer ruta hacia el exterior
oc create route passthrough --service logging-es --hostname elastic.apps.inet
curl -k --cacert admin-ca --cert admin-cert --key admin-key "https://elastic.apps.inet/_cat/indices"
  tendremos que poner -k porque el hostname no corresponderá con el CN del servidor


## Entradas duplicadas
Si vemos entradas duplicadas puede ser debido a una mala configuración del output de fluentd
https://github.com/openshift/origin-aggregated-logging/commit/bb44098634dc4c83ea8fe90b79155a17d91867c1
https://github.com/uken/fluent-plugin-elasticsearch/pull/59/files


# Kibana
Interfaz gráfica para realizar consultas a ES

Se gestiona con dos containers dentro del mismo pod.
El primero (kibana-proxy) gestiona el login para decidir si dejar pasar al segundo
El segundo (kibana) es la aplicación en si.

El proxy es una aplicación node que escucha en el puerto 3000 y autentica a los usuarios contra el Oauth2 de openshift
https://github.com/fabric8io/openshift-auth-proxy



# Mux
En versiones más recientes (3.6?) se introduce un nuevo elemento: mux
https://github.com/openshift/origin-aggregated-logging/blob/master/docs/mux-logging-service.md

Con este nuevo elemento el flow varía.
Los fluentd de cada agente simplemente cogen las trazas de journald y las envían a mux.
Mux se encarga de enriquecerlas con los metadatos de kubernetes y enviarlos a ES.

Parece que la mejora es quitar trabajo a los agentes de fluentd en cada nodo y reducir la carga sobre la API de kubernetes (cachea?)
Posible problema por ser punto único de fallo?

openshift_logging_mux_file_buffer_limit


# ViaQ
Parece que esto es el esquema que se sigue al almacenar los logs de openshift en ES
https://github.com/ViaQ/fluent-plugin-viaq_data_model

Los agentes fluent tendran un filter viaq_data_model para adaptar el formato a este esquema.



# Curator
https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html
Borra indices antiguos.

registry.access.redhat.com/openshift3/logging-curator:3.5.0
Esta imagen tiene un script en python que se encarga de ejecutar el curator con la periodicidad indicada en las variables de entorno.

Se monta un dir en /etc/curator/keys con las claves para acceder a ES

La variable de entorno CURATOR_DEFAULT_DAYS definirá cuantos días de logs se dejarán

CURATOR_RUN_HOUR, CURATOR_RUN_MINUTE, CURATOR_RUN_TIMEZONE, define cuando debe ejecutarse.

Un script en python se encarga de ejecutar el curator con los parámetros adecuados.
