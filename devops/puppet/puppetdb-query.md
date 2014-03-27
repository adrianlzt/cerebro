http://docs.puppetlabs.com/puppetdb/1/configure.html#host
En el fichero /etc/puppetdb/conf.d/jetty.ini se define donde escucha puppetdb y en que puerto.
Para habilitar todos los accesos:
host=0.0.0.0

service puppetdb restart
Tarda bastante rato hasta que abre los puertos

Por defecto está a localhost

CUIDADO! porque no tendremos seguridad de esta manera.




http://docs.puppetlabs.com/puppetdb/1.6/api/query/v3/query.html
http://docs.puppetlabs.com/puppetdb/1.6/api/query/curl.html
http://docs.puppetlabs.com/puppetdb/1.6/api/query/tutorial.html
http://docs.puppetlabs.com/puppetdb/1.6/api/query/v3/operators.html

#########################################################################################################
Gema para hacer las querys:
https://rubygems.org/gems/ruby-puppetdb
https://github.com/dalen/puppet-puppetdbquery
sudo gem install ruby-puppetdb
RUBYLIB=/var/lib/gems/2.0.0/gems/ruby-puppetdb-1.4.0/lib puppet help query

Nos instala el binario find-nodes (modificar manualmente para que no use ssl si no queremos)
find-nodes --puppetdb 192.168.51.2 --port 8080 'monitoring=true'

Para usar sin ssl (https://github.com/dalen/puppet-puppetdbquery/pull/26 para poder usar opción --no_ssl)
puppet query nodes --puppetdb_host 192.168.51.2 --puppetdb_port 8080 'monitoring=true' --no_ssl

No es muy potente. Solo permite hacer querys al endpoint de nodes o facts. 
Para poder hacerlo al resources hace falta usar un parche https://github.com/dalen/puppet-puppetdbquery/pull/18

Parece que no vale para sacar una lista de nodos y luego una lista de recursos de esos nodos.
#########################################################################################################

Nodos activos (por defecto solo nos da los activos):
curl -G 'http://192.168.51.2:8080/v3/nodes' --data-urlencode 'query=["=", ["node", "active"], true]'

Listar recursos de NODO
curl -G http://localhost:8080/v3/catalogs/NODO

curl -G 'http://192.168.51.2:8080/v3/resources' --data-urlencode 'query=["=", "certname", "client.com"]'

Nodos con el fact monitoring=true
curl -G 'http://192.168.51.2:8080/v3/nodes' --data-urlencode 'query=["=", ["fact","monitoring"], "true"]'

Con orden (lo que hace es meter un '&' entre order-by= y query= :
curl -G 'http://192.168.51.2:8080/v3/nodes' --data-urlencode 'order-by=[{"field": "name", "order": "desc"}]' --data-urlencode 'query=["=", ["fact","monitoring"], "true"]'

Obtener los recursos checks del nodo client.com
curl -G 'http://192.168.51.2:8080/v3/resources' --data-urlencode 'query=["and",["=", "certname", "client.com"],["~", "type", "Monitorizacion::Checks.*"]]'

Obtener los ficheros de configuración de nrpe
curl -G 'http://192.168.51.2:8080/v3/resources' --data-urlencode 'query=["and",["=", "certname", "client.com"],["=", "tag", "monitorizacion::check"],["=", "type", "File"]]'


Con la gema rest-client (https://github.com/rest-client/rest-client) y la gema json
require 'rest-client'
response = RestClient.get 'http://192.168.51.2:8080/v3/nodes', {:accept => :json, :params => {:query => '["~", "name", "client.*"]'}}
resp = JSON.parse(response)
resp.each do |h|
h["name"]
end
