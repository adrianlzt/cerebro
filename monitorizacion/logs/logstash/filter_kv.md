https://www.elastic.co/guide/en/logstash/current/plugins-filters-kv.html
Si el mensaje es tipo: pepe=cosa otro=valor nos lo parsea ya.
Por defecto el split entre campos es " ".
Se puede cambiar: field_split => "&?"



Ejemplo para parsear:
time=2015-05-04T10:05:03.775Z | lvl=ERROR | corr=99cfc6a97a6e4c26a8a42e860e5c0794 | trans=b45aaaf0bb8f408786333ba2eafdf2c2 | op=AddAlarms | comp=client | msg=CYCLOPS-600: Error sending alarms: Found no valid connections: [<GearmanConnection 172.16.1.11:4730 connected=False>]



filter {
  kv {
    include_keys => [ "time", "lvl", "corr", "trans", "op", "comp" ]
  } 
  
  grok {
    match => [ "message", ".*msg=%{GREEDYDATA:msg}" ]
    remove_field => [ "message" ]
  } 
  
  date {
    match => [ "time", "ISO8601" ]
    remove_field=>["time"]
  } 
} 

