Logstash crea el indice logstash en elasticsearch automáticamente.
Si lo borramos, lo volverá a crear cuando insertemos datos.

curl -XDELETE 'http://localhost:9200/logstash-2013.11.06/'
