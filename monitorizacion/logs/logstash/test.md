std.conf:
input {
  stdin {
    type => "mitipo"
    add_field => {"token" => "NOMBRE" }
  }
}

output {
  stdout {
    codec => "json"
  }
}



logstash --path.data . -f std.conf
  al arrancar escribiremos algo en el stdin y daremos a enter.

Resultado:
{"message":"mi mensaje","@version":"1","@timestamp":"2015-06-12T14:55:36.668Z","type":"mitipo","token":"NOMBRE","host":"archer"}
