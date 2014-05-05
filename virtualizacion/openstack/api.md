Obtener token manualmente:
curl -d '{"auth":{"passwordCredentials":{"username": "USUARIO", "password": "PASSWORD"}}}' -H "Content-type: application/json" http://openstack.url.com:5000/v2.0/tokens

curl -d '{"auth":{"passwordCredentials":{"username": "USUARIO","password": "PASSWORD"},"tenantName": "TENANTNAME"}}' -H "Content-Type: application/json" http://poenstack.url.com:5000/v2.0/tokens | python -m json.tool

De este último comando obtenemos el token-id (churro super largo de caracteres)
TOKEN_ID=adasSDFSDfwsdfsadFSADFASfda

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack.url.com:5000/v2.0/tenants
Así obtenemos los tenants, contra el identity endpoint

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack.url.com:9696/v2.0/floatingips | python -m json.tool
Listar floating ips, contra el network endpoint

curl -H "X-Auth-Token: $TOKEN_ID" http://openstack:8774/v2/{TENANT_ID}/servers | python -m json.tool
Obtener lista de serviores de un tentant




sudo apt-get install ec2-ami-tools ec2-api-tools

En horizon entrar en dashboard/project/access_and_security/
Bajar las credenciales EC2
unzipear y ejecutar el .sh



