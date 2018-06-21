https://www.elastic.co/guide/en/x-pack/5.6/xpack-introduction.html
X-Pack is an Elastic Stack extension that bundles security, alerting, monitoring, reporting, and graph capabilities into one easy-to-install package

Prior to Elasticsearch 5.0.0, you had to install separate Shield, Watcher, and Marvel plugins to get the features that are bundled together in X-Pack

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


El pack completo es de pago!
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
