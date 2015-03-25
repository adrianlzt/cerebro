https://collectd.org/wiki/index.php/Plugin:Processes
https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_processes


Ejemplo:

<Plugin "processes">
  Process "nginx"
  ProcessMatch "carbon-cache" "python.+carbon-cache"
  ProcessMatch "carbon-aggregator" "python.+carbon-aggregator"
</Plugin>
