http://manpages.ubuntu.com/manpages/precise/en/man8/puppet-catalog.8.html

puppet catalog download
  en un cliente, se baja su catalog del puppetmaster y lo almacena en 

puppet catalog find CERTNAME
Retrieve the catalog for a node

Para obtener el CERTNAME
puppet cert list --all

Buscar solo los recursos tipo file:
puppet catalog select node1.inet file
  Aqui veo recursos file que no se aplican a este nodo :?

Ver que clases se aplican a cada nodo
puppet catalog select node class

Listado de las máquinas que usan este puppet master
puppet cert list --all | awk '{print $2;}' | tr -d "\"" > lista_maquinas


También podemos consultar via API-REST a puppetdb.
Mirar puppetdb-query.md


## DB Schema ##

catalogs -> nos da el catalog_id de cada certname (host)
catalog_resources -> todos los recursos de pupppet, asociados a un catalog_id y con el flag de exported


## Generar catalog en JSON para un nodo ##
puppet master --compile NombreNodo > catalog-nombrenodo.json
Quitar la primera linea del fichero ya que no será parte del JSON

## Aplicar catalog en un client ##
puppet apply --catalog catalog-client.json
