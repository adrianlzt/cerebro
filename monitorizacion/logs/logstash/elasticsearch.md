Logstash crea el indice logstash en elasticsearch automáticamente.
Si lo borramos, lo volverá a crear cuando insertemos datos.

curl -XDELETE 'http://localhost:9200/logstash-2013.11.06/'


output {
  elasticsearch {
    cluster => "nombre"
    node_name => "logstash_agent"
  }
}

El agente logstash buscará, mediante multicast (creo), el cluster ES.
El node_name será el nombre con el que se conectará Logstash al cluster ES.
