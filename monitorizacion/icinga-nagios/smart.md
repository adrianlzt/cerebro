http://smartlinux.sourceforge.net/smart/index.php
nagios-plugins-ide_smart
Este oficial parece que tiene problemas:
https://github.com/monitoring-plugins/monitoring-plugins/issues/1104
https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=690760


Usar:
https://exchange.icinga.org/exchange/Check+SMART+status
https://exchange.icinga.org/exchange/Check+SMART+status/files/56/check_smart

Este tiene como requisito a nagios-plugins-perl
Y, en RHEL, es necesario modificar la línea:
use lib '/usr/lib/nagios/plugins/';
por
use lib '/usr/lib64/nagios/plugins/';


