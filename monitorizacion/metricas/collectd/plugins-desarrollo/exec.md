https://collectd.org/documentation/manpages/collectd-exec.5.shtml#exec_data_format

Los ejecutables deberán escribir sus valores a stdout.

Ejemplo (de exec-nagios.px)
PUTVAL "client1/nagios-check_tcp/delay-time" interval=10 1405012626:0.004902


"delay" debe ser un tipo de dato aceptado (mirar en types.md)

interval se usa para decir cuanto tiempo ha pasado entre la toma de datos y es útil para algunos types.

Luego se pone la fecha en formato unix time stamp (date +%s) y el/los valores.
Según el type puede tener que enviarse uno o más valores.
 
Por ejemplo para el type "df" debemos enviar el espacio usado y el free, lo haríamos como:
1405012626:79836783:574857

Segun el type tambien se pueden enviar unos datos u otros (números negativos, decimales, etc)
