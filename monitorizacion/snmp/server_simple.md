conf:
view   all         included   .1
rocommunity public  default    -V all

sudo snmpd -f -c conf 127.0.0.1:161

Obtener los datos:
snmpwalk -v 2c -c public 127.0.0.1:161 .1
