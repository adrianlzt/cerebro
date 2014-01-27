http://docs.rackspace.com/servers/api/v2/cs-gettingstarted/content/overview.html

### Endpoint ###
Mi cuenta está alojanda en londres, por lo que el endpoint a donde ataco será https://lon.* (en el manual por defecto está https://dfw.*)

Autentificarse:
London endpoint: https://lon.identity.api.rackspacecloud.com/v2.0

curl -s https://lon.identity.api.rackspacecloud.com/v2.0/tokens -X 'POST' -d '{"auth":{"passwordCredentials":{"username":"theUserName", "password":"thePassword"}}}' -H "Content-Type: application/json" | python -m json.tool

Nos da un montón de endpoints, y los tenantid (account number) para cada uno 
Nos interesa el account y el token.

El token nos da una fecha de expiración (24h), el account y el token id. Estos dos últimos serán los que necesitemos para hacer consultas a la API

Ejemplo:
        "token": {
            "RAX-AUTH:authenticatedBy": [
                "PASSWORD"
            ],
            "expires": "2013-10-20T01:34:32.357Z",
            "id": "482cffa480bbf3fae4b1732",  <---- este será nuestro token
            "tenant": {
                "id": "1002",  <------ esta será nuestra account (es siempre la misma. La podemos ver junto a nuestro nombre al loguearnos en la web)
                "name": "1002"
            }
        },

Los definimos como variables de entorno:
export account="1002"
export token="482cfa480bbf3ffe4b1732"


# Images
curl -s https://lon.servers.api.rackspacecloud.com/v2/$account/images/detail -H "X-Auth-Token: $token" | python -m json.tool

Para sacar los nombres de todas las imágenes:
curl -s https://lon.servers.api.rackspacecloud.com/v2/$account/images/detail -H "X-Auth-Token: $token" | python -m json.tool | grep name
