https://collectd.org/wiki/index.php/Plugin:Disk

Tenemos que cargar el plugin y configurarlo (en /etc/collectd.conf)

LoadPlugin disk

<Plugin disk>
        #Disk "/^[hs]d[a-f][0-9]?$/"
        #Disk "md2" #Parece que no pilla estos discos, uso sdb que es el 'padre', segun indica lsblk
	Disk "sdb" 
	IgnoreSelected false
</Plugin>


Si queremos poner el nombre del disco, tiene que ser los que aparecen en /proc/diskstats.
Podemos ver la correspondencia de estos nombres con el comando lsblk

Si queremos usar expresiones regulares para ver que discos monitorear se hace entre barras ('/')

El parámetros 'IgnoreSelected' es para chequear todos menos los que hagan match.


Los datos rrd pueden tardar un poco en aparecer. Darle tiempo.
