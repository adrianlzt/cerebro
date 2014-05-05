# http://docs.puppetlabs.com/puppet/2.7/reference/lang_node_definitions.html


# /etc/puppetlabs/puppet/manifests/site.pp
node 'www1.example.com' {
  include common
  include apache
  include squid
}
node 'db1.example.com' {
  include common
  include mysql
}

# Se pueden usar regexp en el nombre del nodo (http://docs.puppetlabs.com/puppet/2.7/reference/lang_datatypes.html#regular-expressions):
node /percona[0-9]/ { }


# Y el node default será el que tomará un nodo que no haga match en algún otro node
node default { }

node 'nodo1', 'nodo2' {
  include mysql
}


#No se pueden usar variables:
node "${var}" { <-- MAL!
}
