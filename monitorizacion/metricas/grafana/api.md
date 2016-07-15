http://docs.grafana.org/reference/http_api/
https://github.com/grafana/grafana/blob/6da3af5e894439653687a8218f665983b97458d6/pkg/api/api.go

# Login
Se puede usar http auth basic, pero mejor crear una API key desde la interfaz web.
Por defecto estaremos en una orga y los cambios aplicaran a esa orga. Mirar en la sección de orgas para ver como cambiar de una a otra

Con basic auth:
curl -XPOST -s -u "admin:pass" -H "Content-Type: application/json" http://192.168.22.95/api/user/using/16

Con API:
curl -H "Authorization: Bearer your_key_above" http://your.grafana.com/api/dashboards/db/mydash

# Dashboards

## Leer
GET /api/dashboards/db/NOMBRE

## Crear / Actualizar
POST /api/dashboards/db
{
  "dashboard": {
    "id": null,
    "title": "Production Overview",
    "tags": [ "templated" ],
    "timezone": "browser",
    "rows": [
      {
      }
    ],
    "schemaVersion": 6,
    "version": 0
  },
  "overwrite": false
}

## Borrar
DELETE /api/dashboards/db/NOMBRE


# Datasources

## Listar
GET /api/datasources

## Leer uno
GET /api/datasources/:datasourceId

## Crear
curl -s -H "Authorization: Bearer XXX" -H "Content-Type: application/json" http://grafana.com/api/datasources -d '{
  "name":"test_datasource",
  "type":"graphite",
  "url":"http://mydatasource.com",
  "access":"proxy",
  "basicAuth":false
}'

## Modificar
PUT /api/datasources/:datasourceId

# Organizaciones
GET /api/org

GET /api/orgs/:orgId
GET /api/orgs/name/:name

## Cambiar mi usuario de organizacion
curl -XPOST -s -u "user:pass" -H "Content-Type: application/json" http://192.168.22.95/api/user/using/16


## Crear
No documentada

curl -s -u "" -H "Content-Type: application/json" http://192.168.22.95/api/orgs -d '{"name":"pepe"}'
