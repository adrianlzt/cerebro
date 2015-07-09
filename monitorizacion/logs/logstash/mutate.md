https://www.elastic.co/guide/en/logstash/current/plugins-filters-mutate.html

mutate {
  replace => [ "@source_host", "%{syslog_hostname}" ]
  replace => [ "@message", "%{syslog_message}" ]
}

mutate {
  remove_field => [ "syslog_hostname", "syslog_message", "syslog_timestamp" ]
}


mutate { replace => [ "token", "no-token" ] }

# Forzar un tipo de dato a un field
# Valid conversion targets are: integer, float, string, and boolean.
filter {
  mutate {
    convert => { "fieldname" => "integer" }
    convert => { "otherfiled" => "float" }
  }
}

Si algún índice de logstash ya tiene ese campo como string, aunque lo forcemos luego seguirá en string en ES. Tendremos que hacer un mapping
 (creo): https://groups.google.com/forum/#!topic/logstash-users/2ewrcovttSY

