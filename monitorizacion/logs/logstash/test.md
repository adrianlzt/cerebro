input {
  file {
    path => "/home/adrian/Documentos/datadope/carrefour/zabbix/PRP-39/logstash/fichero"
    sincedb_path => "/dev/null"
     start_position => "beginning"
  }
}

filter {
}

output {
  stdout {
    codec => "rubydebug"
  }
}




logstash -r --path.data . -f config.conf
  al arrancar escribiremos algo en el stdin y daremos a enter.
  cada vez que modifiquemos el fichero se recargará la config automáticamente
