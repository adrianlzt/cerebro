wget https://download.elasticsearch.org/logstash/logstash/logstash-1.3.3-flatjar.jar
vi log.conf

input {
  file {
    path => "/home/adrian/Documentos/logstash/storm/ssl_error_log"
    type => "apache"
  }
}
filter {
  if [type] == "apache" {
    grok {
      match => [ "message", "%{COMBINEDAPACHELOG}" ]
    }
    date {
      match => [ "timestamp", "dd/MMM/YYYY:HH:mm:ss Z" ]
    }
  }
}
output {
  elasticsearch { embedded => true }
}


java -jar logstash-1.3.3-flatjar.jar agent -f log.conf -- web

http://127.0.0.1:9292/index.html#/dashboard/file/logstash.json
