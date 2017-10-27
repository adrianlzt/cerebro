Para problemas con el stdin mirar debug.md

Logstash crea el indice logstash en elasticsearch automáticamente.
Si lo borramos, lo volverá a crear cuando insertemos datos.

curl -XDELETE 'http://localhost:9200/logstash-2013.11.06/'


output {
  elasticsearch {
    protocol => http
    host => "localhost"
    index => "tweets"
  }
}


# Antiguo? Cluster?
output {
  elasticsearch {
    cluster => "NOMBRE"
    node_name => "logstash_agent"
  }
}

El agente logstash buscará, mediante multicast (creo), el cluster NOMBRE.
El node_name será el nombre con el que se conectará Logstash al cluster NOMBRE.


# Filter
https://www.elastic.co/guide/en/logstash/current/plugins-filters-elasticsearch.html

Pueden hacerse consultas por ejemplo para sacar tiempos entre un evento que entró y su finalización.


# Usando certs TLS para cliente
https://github.com/logstash-plugins/logstash-input-elasticsearch/pull/80
