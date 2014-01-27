Configuraciones para agente:


Lee de un fichero con formato syslog y lo escribe al redis para que lo procese logstash server
input {
  file {
    path => "/var/log/syslog.log"
    type => "syslog"
  }
}
output {
  redis { host => "127.0.0.1" data_type => "list" key => "logstash" }
}


Parece que coge del fichero los nuevos añadidos. Si el fichero ya contenía datos no los procesa.


Ejemplo con Grok para syslog http://cookbook.logstash.net/recipes/syslog-pri/

input {...}
filter {
  if [type] == "syslog" {
    grok {
      match => { "message" => "<%{POSINT:syslog_pri}>%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }
      add_field => [ "received_at", "%{@timestamp}" ]
      add_field => [ "received_from", "%{@source_host}" ]
    }
    syslog_pri { }
    date {
      match => { "syslog_timestamp" => [ "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ] }
    }
    if !("_grokparsefailure" in [tags]) {
      mutate {
        replace => [ "@source_host", "%{syslog_hostname}" ]
        replace => [ "@message", "%{syslog_message}" ]
      }
    }
    mutate {
      remove_field => [ "syslog_hostname", "syslog_message", "syslog_timestamp" ]
    }
  }
}
output {...}
