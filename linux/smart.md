http://smartlinux.sourceforge.net/smart/index.php
http://www.activasistemas.com/blog/2013/11/22/comprobando-la-salud-de-los-discos-duros-en-un-sistema-linux/

yum install smartmontools

Discos:
smartctl --scan

Para saber si tienen S.M.A.R.T.
smartctl -i /dev/xxx
  Deberá poner:
  Device supports SMART and is Enabled

Más info:
smartctl -a <disco>

Más info hardware:
smartctl -x <disco>

Estado del disco
smartctl -H <disco>

Temperatura, fecha de fabricación, números de arranques del disco, etc
smartctl --attributes /dev/sda
