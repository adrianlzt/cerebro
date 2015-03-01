https://collectd.org/documentation/manpages/collectd-exec.5.shtml#exec_data_format

Los ejecutables deberán escribir sus valores a stdout.

PUTVAL "NOMBREHOST/nombrecheck/TIPODATO-nombre interval=$INTERVAL N:$VALUE

Donde N, puede dejarse el caracter 'N' (para now), o poner el timestamp (unix epoch)

Ejemplo (de exec-nagios.px)
PUTVAL "client1/nagios-check_tcp/delay-time" interval=10 1405012626:0.004902

Ejemplo:
PUTVAL leeloo/cpu-0/cpu-idle N:2299366
  esto en graphite seria: leeloo.cpu-0.cpu-idle
PUTVAL alice/interface/if_octets-eth0 interval=10 1180647081:421465:479194


"delay" debe ser un tipo de dato aceptado (mirar en types.md)

interval se usa para decir cuanto tiempo ha pasado entre la toma de datos y es útil para algunos types.

Luego se pone la fecha en formato unix time stamp (date +%s) y el/los valores.
Según el type puede tener que enviarse uno o más valores.
 
Por ejemplo para el type "df" debemos enviar el espacio usado y el free, lo haríamos como:
1405012626:79836783:574857

Segun el type tambien se pueden enviar unos datos u otros (números negativos, decimales, etc)



#!/bin/bash
HOSTNAME="${COLLECTD_HOSTNAME:-localhost}"
INTERVAL="${COLLECTD_INTERVAL:-60}"

while sleep "$INTERVAL"; do
  VALUE=do_magic()
  echo "PUTVAL \"$HOSTNAME/exec-magic/gauge-magic_level\" interval=$INTERVAL N:$VALUE"
done

Ejemplos de PUTVAL



LoadPlugin exec
<Plugin exec>
  Exec "myuser:mygroup" "myprog"
  Exec "otheruser" "/path/to/another/binary" "arg0" "arg1"
  NotificationExec "user" "/usr/lib/collectd/exec/handle_notification"
</Plugin>
