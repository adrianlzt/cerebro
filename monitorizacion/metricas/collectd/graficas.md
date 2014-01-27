Collectd no está pensando para generar gráficas, pero nos dan una pequeña interfaz para que podamos visualizarlas.
También podemos usar la utilidad rrdtool para generar png a partir de los ficheros rrd, pero hay que meter un montón de parámetros.
Puede que los valores tarden un poco desde que se toman hasta que aparecen en los ficheros .rrd (pocos minutos creo)

https://collectd.org/wiki/index.php/First_steps#Creating_graphs

Para ver las gráficas instalo kcollectd en mi máquina
https://collectd.org/wiki/index.php/Kcollectd
http://www.forwiss.uni-passau.de/~berberic/Linux/kcollectd.html
Para que kcollectd cargue los datos tenemos que meterlos en /var/lib/collectd/rrd
Si falla, comprobar que el usuario tiene permisos de lectura en TODO el arbol /var/lib/collectd/

Mas front-ends: https://collectd.org/wiki/index.php/List_of_front-ends
http://web.taranis.org/drraw/


Mirar ficheros rrd generados.
Mirar rrdtool.
Parece que flushea los datos cada 2', como podemos ver con rrdlast fichero.rrd
