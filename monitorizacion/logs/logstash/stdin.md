https://www.elastic.co/guide/en/logstash/master/plugins-inputs-stdin.html
https://www.elastic.co/guide/en/logstash/master/plugins-outputs-stdout.html

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

