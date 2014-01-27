Graphite can also read directly from collectd‘s RRD files. RRD files can simply be added to STORAGE_DIR/rrd (as long as directory names and files do not contain any . characters). For example, collectd’s host.name/load/load.rrd can be symlinked to rrd/collectd/host_name/load/load.rrd to graph collectd.host_name.load.load.{short,mid,long}term.

/opt/graphite/storage/rrd


Metemos el fichero .rrd en el directorio rrd de graphite.
Hace falta tener el python-rrd
apt-get install python-rrd
Y reiniciar apache (el cache creo que no hace falta)
