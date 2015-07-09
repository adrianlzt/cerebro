https://www.elastic.co/guide/en/logstash/master/plugins-filters-grok.html#plugins-filters-grok-break_on_match

%{TIPO_DE_DATO:nombre_variable[:conversion]}
%{NUMBER:bytes:int}
%{NUMBER:requested_time:float}
La conversión puede ser a int o float
Por defecto todo se parsea como strings.
Cuidado, por que los tipos predefinidos que nos da logstash no están forzados a int/float.
Si algún índice de logstash ya tiene ese campo como string, aunque lo forcemos luego seguirá en string en ES. Tendremos que hacer un mapping (creo): https://groups.google.com/forum/#!topic/logstash-users/2ewrcovttSY
Otra opción es usar el filtro "mutate".

Los tipos de datos son los que nos da Logstash (https://github.com/logstash-plugins/logstash-patterns-core)


filter {
  grok {
    match => {
      "message" => '%{IPORHOST:clientip} %{USER:ident} %{USER:auth} \[%{HTTPDATA:timestamp}\] "%{WORD:verb} ${DATA:request} ...
    }
  }


En caso de que falle el filtrado devolverá un mensaje con el tag _grokparsefailure:

{"message":"asdfa sd ","@version":"1","@timestamp":"2015-06-12T15:09:32.780Z","type":"iris","token":"NOMBRE","host":"archer","tags":["_grokparsefailure"]}


Testear varias expr contra el mismo campo. La primera que haga match gana.
Se puede poner "break_on_match => false" para que no pare tras un match.

grok {
  patterns_dir => "./patterns"
  match => { "message" => [
                            "%{TICS_LOG}",
                            "%{TICS_LOG4}",
                            "%{TICS_LOG3}",
                            "%{TICS_LOG2}",
                            "%{TICS_LOG1}"
                          ]
  }
}

