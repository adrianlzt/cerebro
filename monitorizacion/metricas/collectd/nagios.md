http://collectd.org/documentation/manpages/collectd-nagios.1.shtml
https://collectd.org/wiki/index.php/Collectd-nagios

La idea es un pequeño plugin de nagios (collectd-nagios) que chequea valores en el socket que abre collectd.
Le dices de que host y de que valor quieres leer, y el valor crítico y warning.

/usr/bin/collectd-nagios
