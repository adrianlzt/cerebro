http://logstash.net/docs/1.3.3/configuration

Las configuraciones seguirán el 'flow' de logstash: INPUT->FILTERS->OUTPUT

Las configuraciones las meteremos, si hemos instalado desde el .deb, en /etc/logstash/conf.d
Mejor separar un flow input-filter-output en cada fichero

If you specify multiple filters, they are applied in the order of their appearance in the configuration file.

Chequeo conf:
logstash --configtest -f /etc/logstash/conf.d/

-f fichero.conf
-f /directorio/
-f '/dir/lo*conf'

En caso de directorio o wildcard se leeran los ficheros en orden alfabético.
CUIDADO con los wildcards, si no lo ponemos entre comillas simples la shell lo expandera y le dará a logstash algo estilo
logstash -f fichero1.conf fichero2.conf fichero3.conf
Y logstash solo hará caso al primero.



## Sacar valores de un evento ##

Ejemplo de evento:
{
  "type": "web",
  "response": {
    "status": 200
  },
  "ua": {
    "os": "Windows 7"
  }
}

[type]
[ua][os]

output {
  statsd {
    increment => "apache.%{[response][status]}"
  }
}


## Ejemplo básico ##
Lee un fichero de log apache combined y lo escribe directamente a logstash:
Ficheros de ejemplo de apache combined: http://www.monitorware.com/en/logsamples/download/apache-samples.rar
input {
  file {
    path => "/tmp/access_log/access_log"
  }
}
filter {
}
output {
  elasticsearch {
    cluster => "nombre"
    node_name => "logstash_agent"
  }
}

Más sobre configurar ES como output en elasticsearch.md

## Mejorando apache log ## 
El output lo mantengo tal cual
input {
  file {
    path => "/tmp/access_log/access_log"
    type => "apache"  <- aqui asignamos una 'etiqueta' a los eventos que vengan de este fichero
  }
}
filter {
  if [type] == "apache" {
    grok {
      patterns_dir => [ "/etc/logstash/patterns.d" ] <- podemos meter un directorio de patterns
      match => [ "message", "%{COMBINEDAPACHELOG}" ] <- aqui pasamos un frok predefinido que analiza la estructura de un fichero apache combined
    }
    date {
      locale => "en" <- si nuestro sistema tiene locale español, pero el log está en inglés tendremos que poner esto
      match => [ "timestamp", "dd/MMM/YYYY:HH:mm:ss Z" ] <- hacemos que la variable genérica de ES timestamp la coja del message buscando ese patrón (si no, coge la hora de llegada del mensaje al servidor ES)
    }
    if [agent] != "" {
      useragent { source => "agent" } <- me genera unas cuantas varibles más: name, os, os_name os_minor, os_major
    }
    geoip { source => "clientip" } <- generará variables con la localidad, lat, long, pais, continente, etc. Mirar geoip.md
  }
}


## syslog to redis ##
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
