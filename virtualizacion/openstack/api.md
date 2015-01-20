Obtener token manualmente:
curl -d '{"auth":{"passwordCredentials":{"username": "USUARIO","password": "PASSWORD"},"tenantName": "TENANTNAME"}}' -H "Content-Type: application/json" http://poenstack.url.com:5000/v2.0/tokens | python -m json.tool

De este último comando obtenemos el token-id (churro super largo de caracteres)
export TOKEN_ID="adasSDFSDfwsdfsadFSADFASfd..."

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack.url.com:5000/v2.0/tenants
Así obtenemos los tenants, contra el identity endpoint

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack.url.com:9696/v2.0/floatingips | python -m json.tool
Listar floating ips, contra el network endpoint

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack:8774/v2/{TENANT_ID}/servers | python -m json.tool
Obtener lista de serviores de un tentant

Crear volumen
curl -H "X-Auth-Token: $TOKEN_ID" https://openstack:8776/v2/{TENANT_ID}/volumes -X POST -H "Content-Type: application/json" -d '{"volume":{"size":1}}' | python -m json.tool


sudo apt-get install ec2-ami-tools ec2-api-tools

En horizon entrar en dashboard/project/access_and_security/
Bajar las credenciales EC2
unzipear y ejecutar el .sh



