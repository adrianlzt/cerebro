Todo el tema de configuraciones de seguridad van por defecto a: /usr/share/elasticsearch/plugins/opendistro_security/securityconfig

Si queremos desactivar toda la seguridad:
opendistro_security.disabled: true

Si queremos usar kibana con odfe tenemos que quitarle el plugin de security a kibana.


# TLS
Ahora mismo no es posible desactivar TLS para la conexión intra-nodos, está en el roadmap: https://github.com/orgs/opendistro-for-elasticsearch/projects/3#card-51395257

# Auth
https://opendistro.github.io/for-elasticsearch-docs/docs/security/configuration/concepts/#authentication-flow

## Users backend
Se pueden usar internal users o LDAP
