http://docs.pnp4nagios.org/pnp-0.4/tpl
http://docs.pnp4nagios.org/pnp-0.4/tpl_custom

Pnp4Nagios puede generar gráficas agregadas para según que check_command.
Parece que tambien para check_nrpe!COMANDO

/etc/pnp4nagios/check_commands/check_nrpe.cfg
Aquí definimos que use use check_nrpe!ESTO para coger las plantillas poniendo
CUSTOM_TEMPLATE = 1

Mirar como hacer para sacar gráficas bonitas.
Los check names que se usen despues de check_nrpe deben estar estandarizados.

Si ya existe una gráfica generada con el template por defecto

Traza de ejecucción del worker gearman de pnp.
Vemos como llega una nueva perfdata (de la que aún no existen fichero .rrd y .xml) y como usa el template check_disk.php (/usr/share/nagios/html/pnp4nagios/templates.dist/check_disk.php)

2014-10-23 18:08:32 [2994] [1] Found Performance Data for controller / disk (/=1361MB;40316;45356;0;50396 /dev/shm=0MB;12842;14447;0;16053 /boot=54MB;387;435;0;484 /data=179MB;58415;65717;0;73019) 
2014-10-23 18:08:32 [2994] [2] Adapting Template using ARG 1
2014-10-23 18:08:32 [2994] [2] Adapting Template to check_disk.php (added ARG1)
2014-10-23 18:08:32 [2994] [2] Adapting Template to check_disk.php as defined in /etc/pnp4nagios/check_commands/check_nrpe.cfg
...
2014-10-23 18:08:32 [2994] [2] data2rrd called
2014-10-23 18:08:32 [2994] [2] Reading /etc/pnp4nagios/rra.cfg
2014-10-23 18:08:32 [2994] [2] RRDs::create /var/lib/pnp4nagios/controller/disk.rrd RRA:AVERAGE:0.5:1:2880 RRA:AVERAGE:0.5:5:2880 RRA:AVERAGE:0.5:30:4320 RRA:AVERAGE:0.5:360:5840 RRA:MAX:0.5:1:2880 RRA:MAX:0.5:5:2880 RRA:MAX:0.5:30:4320 RRA:MAX:0.5:360:5840 RRA:MIN:0.5:1:2880 RRA:MIN:0.5:5:2880 RRA:MIN:0.5:30:4320 RRA:MIN:0.5:360:5840 DS:1:GAUGE:8460:U:U DS:2:GAUGE:8460:U:U DS:3:GAUGE:8460:U:U DS:4:GAUGE:8460:U:U --start=1414105712 --step=60
2014-10-23 18:08:32 [2994] [2] /var/lib/pnp4nagios/controller/disk.rrd created


# Cambiar un template
Para que una métrica use uno u otro template solo tenemos que modificar el fichero .xml (/var/lib/pnp4nagios/NOMBREHOST/SERVICEDESC.xml)
y donde pone
<TEMPLATE>check_disk</TEMPLATE>
definir el template que queremos usar.
Como vemos se puede usar un template distinto por cada elemento del perfdata que nos envían.
