Se puede desarrollar plugins en c, python, perl, java.


A partir de la versión 5.4.1 se puede definir la variable
  AutoLoadPlugin true
Para que automáticamente se carguen los plugins necesarios.
Ejemplo, si definimos un <exec> automáticamente se cargará "LoadPlugin exec".
Para los plugins sin información (Load por ejemplo) seguirá siendo necesario el LoadPlugin.


Un mismo bloque de configuración de plugin puede repetirse en distintos ficheros:
disk1.conf
<Plugin disk>
       Disk "/vagrant"
       IgnoreSelected false
</Plugin>

disk2.conf
<Plugin disk>
       Disk "/pepe"
       IgnoreSelected false
</Plugin>


Con thresholds está permitido definir varios <Plugin threshold> pero nos dará el warning (https://github.com/collectd/collectd/issues/551): 
Starting collectd: plugin: register_callback: a callback named `threshold' already exists - overwriting the old entry!

