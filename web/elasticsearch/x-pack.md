https://www.elastic.co/guide/en/x-pack/5.6/xpack-introduction.html
X-Pack is an Elastic Stack extension that bundles security, alerting, monitoring, reporting, and graph capabilities into one easy-to-install package

Prior to Elasticsearch 5.0.0, you had to install separate Shield, Watcher, and Marvel plugins to get the features that are bundled together in X-Pack


El pack completo es de pago!
Dan 30 días de prueba
https://www.elastic.co/guide/en/x-pack/5.6/license-expiration.html

Tabla con lo que ofrece cada tipo de licencia y que tiene la gratuita
https://www.elastic.co/subscriptions

En resumen, hay un tipo de licencia "Basic" gratuita que parece que tiene Monitoring, el resto de cosas es de pago.


# Security
https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html
https://www.elastic.co/guide/en/elasticsearch/reference/6.0/security-api.html

## Crear user admin
curl -u elastic:elastic 172.16.10.18:9200/_xpack/security/user/beats -d '{"password" : "beats123", "roles" : [ "admin"]}'

## Quien somos y nuestros permisos
curl -u user:pass 'localhost:9200/_xpack/security/_authenticate?pretty'

