https://www.elastic.co/guide/en/logstash/current/plugins-filters-elapsed.html

medir tiempo entre lineas
/usr/share/logstash/bin/logstash-plugin install logstash-filter-elapsed

filter {
  grok {
    match => ["message", "%{INT:zabpid}:%{BASE16NUM:zabdate}:%{BASE16FLOAT:zabtime} In %{GREEDYDATA:function}" ]
    add_tag => [ "start" ]
  }

  grok {
    match => ["message", "%{INT:zabpid}:%{BASE16NUM:zabdate}:%{BASE16FLOAT:zabtime} End of %{GREEDYDATA:function}" ]
    add_tag => [ "end" ]
  }

  mutate {
    rename => ["host", "logsource"]
    replace => ["timestamp", "%{zabdate} %{zabtime}" ]
  }

  date {
    match => [ "timestamp", "YYYYMMss HHmmss.SSS" ]
  }

  elapsed {
    start_tag => "start"
    end_tag => "end"
    unique_id_field => "zabpid"
  }
}
