http://docs.fluentd.org/v0.12/articles/monitoring

Documentación sobre como monitorizar el agente.


Tambien existe una posibilidad de consultar datos al agente.
Abre un puerto donde consultar la config actual y los plugins.
En la version 0.14 los plugins nos pueden decir si están haciendo algún retry.

https://github.com/fluent/fluentd/blob/182bebd38b67297e686b6624433fe9155efcaadd/lib/fluent/plugin/in_monitor_agent.rb


Podemos consultar en formato columna o json la config que esta corriendo y el estado de los plugins:

curl "http://localhost:24220/api/config"
curl "http://localhost:24220/api/config.json"
curl "http://localhost:24220/api/config.json?debug=1"

curl "http://localhost:24220/api/plugins"
curl "http://localhost:24220/api/plugins.json"
curl "http://localhost:24220/api/plugins.json?debug=1"

En los plugins de output tendremos el tamaño del buffer usado, el número de elementos y el número de reintentos:

Ejemplo columna:
plugin_id:object:2b27955b48b0 plugin_category:output  type:elasticsearch_dynamic  output_plugin:true  buffer_queue_length:1 buffer_total_queued_size:2056 retry_count:6


Ejemplo json:
    {
      "plugin_id": "object:2b27955b48b0",
      "plugin_category": "output",
      "type": "elasticsearch_dynamic",
      "config": {
        "@type": "elasticsearch_dynamic",
        "host": "127.0.0.1",
        "port": "289232",
        "index_name": "project.${record['kubernetes']['namespace_name']}.${record['kubernetes']['namespace_id']}.${Time.parse(record['@timestamp']).getutc.strftime(@logstash_dateformat)}",
        "type_name": "com.redhat.viaq.common",
        "reload_connections": "false",
        "reload_on_failure": "false",
        "flush_interval": "5s",
        "max_retry_wait": "300",
        "disable_retry_limit": ""
      },
      "output_plugin": true,
      "buffer_queue_length": 1,
      "buffer_total_queued_size": 2734,
      "retry_count": 8,
      "retry": {
        "steps": 8,
        "next_time": "2017-10-09 10:54:37 +0000"
      }
    }




# Problemas
No encuentro fiable los valores de buffer_queue_length y buffer_total_queued_size.

La longitud de la cola no parece crecer con cada elemento nuevo.
Y el size de la cola parece crecer con cada reintento.
