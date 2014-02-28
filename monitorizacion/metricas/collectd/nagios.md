https://github.com/collectd/collectd/blob/master/src/collectd-nagios.pod
http://collectd.org/documentation/manpages/collectd-nagios.1.shtml
https://collectd.org/wiki/index.php/Collectd-nagios
http://www.3open.org/d/collectd/working_with_nagios

La idea es un pequeño plugin de nagios (collectd-nagios) que chequea valores en el socket que abre collectd.
Le dices de que host y de que valor quieres leer, y el valor crítico y warning.

/usr/bin/collectd-nagios

Hace falta que collectd tenga configurado el unix-socket.

Para mirar que valores tenemos disponibles: echo "LISTVAL" | nc -U /var/run/collectd.sock

collectd-nagios -s /var/run/collectd.sock -H cliente -n "load/load" -d longterm -w 3 -c 4

Si no definimos la -d nos mostrará todos los valores posibles, y saltará la alarma si alguno de los valores pasa el threshold (también se puede hacer que sea por media de los valores, suma o porcentaje).


Si queremos definir un threshold inverso, por ejemplo, avisar cuando el espacio libre sea menos del 25%:
  collectd-nagios -s /var/run/collectd.sock -H cliente -n "df-vagrant/percent_bytes-free" -w 25:
También podemos poner @ (que invierte los resultados)
  collectd-nagios -s /var/run/collectd.sock -H cliente -n "df-vagrant/percent_bytes-free" -w @25

También podemos usar min:max
  If a value is smaller than min or bigger than max, a warning or critical status is returned, otherwise the status is success.

~ se puede usar como infinito

NaN se considera warning, excepto si ponemos "-m" que se considerará critical.



## Enviar checks pasivos a nagios ##
http://mailman.verplant.org/pipermail/collectd/2012-August/005310.html
Programa en perl
