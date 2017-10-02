http://docs.fluentd.org/v0.12/articles/monitoring

Documentación sobre como monitorizar el agente.


Tambien existe una posibilidad de consultar datos al agente.
Abre un puerto donde consultar la config actual y los plugins.
En la version 0.14 los plugins nos pueden decir si están haciendo algún retry.

https://github.com/fluent/fluentd/blob/182bebd38b67297e686b6624433fe9155efcaadd/lib/fluent/plugin/in_monitor_agent.rb
