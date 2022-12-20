https://docs.gitlab.com/ee/api/README.html
Clientes para lenguajes: https://about.gitlab.com/applications/#api-clients

Ejemplo usando como auth un private token:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects | jq

Lista de grupos:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/groups | jq

Crear un repo:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects -XPOST -d 'name=pruebaapi3' -d 'description=pepe' | jq

Crear un repo en un grupo determinado:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects -XPOST -d 'name=pruebaapi3' -d 'description=pepe' -d 'namespace_id=34' | jq



