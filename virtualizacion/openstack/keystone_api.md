# V2
Obtener catalog y token de Keystone para el user=admin, pass=secret, tenant=admin

curl -d '{"auth":{"passwordCredentials":{"username": "admin",
"password": "secret"},"tenantName": "admin"}}' -H "Content-Type: application/json" http://localhost:5000/v2.0/tokens | python -m json.tool

El token es: dict["access"]["token"]["id"]


Obteniendo lista de nodos:
curl -g -i -X GET http://localhost:8774/v2/06abd49655b148f084c8d8e4f164e983/servers/detail -H "User-Agent: python-novaclient" -H "Accept: application/json" -H "X-Auth-Token: ef2da0a87beac37f0bdcec5eddc494664fa62d18"

# V3
http://docs.openstack.org/developer/keystone/http-api.html#i-have-a-non-python-client

Ahora el token viene en el header: X-Subject-Token

curl -s -H "Content-Type: application/json" -d '
{ "auth": {
    "identity": {
      "methods": ["password"],
      "password": {
        "user": {
          "name": "admin",
          "domain": { "id": "default" },
          "password": "secret"
        }
      }
    }
  }
}'   http://localhost:5000/v3/auth/tokens -v 2>&1 | grep "X-Subject-Token"
