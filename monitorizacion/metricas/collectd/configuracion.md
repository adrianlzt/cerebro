El fichero de configuración es /etc/collectd.conf
También se pueden meter configuraciones en /etc/collect.d
  con collectd 5.1 meto cosas ahi con nombre.conf y no parece leerlos


Debemos configurar una salida de log: syslog o logfile
Yo prefiero configurar el logfile y escribir a un fichero único:

#LoadPlugin syslog
LoadPlugin logfile
<Plugin logfile>
        LogLevel info
#       File STDOUT
        File "/var/log/collectd.log"
        Timestamp true
#       PrintSeverity false
</Plugin>

In order for other plugins to be able to report errors and warnings during initialization, the LogFile plugin should be loaded as one of the first plugins, if not as the first plugin. This means that its LoadPlugin line should be one of the first lines in the configuration file.

Como método de almacenamiento de datos uso RRDtool (se necesita el paquete collectd-rrdtool)
LoadPlugin rrdtool
<Plugin rrdtool>
        DataDir "/var/lib/collectd/rrd"
        CacheTimeout 120
        CacheFlush   900
</Plugin>


Otro parámetro importante es el interval:
The Interval setting controls how often values are read. You should set this once and then never touch it again. If you do, you will have to delete all your RRD files or know some serious RRDtool magic!

Tambien definimos el nombre de la máquina: Hostname    "comonpercomysql03"
Se puede hacer automáticamente con el parámetro FQDNLookup

Hace falta que creemos los directorios donde se van a guardar los ficheros rrd (/var/lib/collectd/rrd , uso este directorio porque /var/lig/collectd ya lo ha creado el rpm). Tambien hacer un touch del fichero de log (/var/log/collectd.log)

Ahora deberemos decidir que plugins cargamos (cpu, load, memoria, interfaces, etc), y mirar sus configuraciones por si hiciese falta tunear algo.
Documentación sobre configuración de plugins la dejo en nuevos ficheros o en plugins.md si es poca cosa.

Chequear conf:
collectd -t -C /etc/collectd.conf

service collectd start
