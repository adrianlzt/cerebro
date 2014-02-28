https://collectd.org/wiki/index.php/Plugin:DF

Saca estadísticas de puntos de montaje, o /dev, relativos a ocupación y espacio total

Debe elegirse un único método para elegir que mostrar: Device, MountPoint o FSType.
Si definimos:
  Device /dev/sda
  MountPoint /vagrant
No nos mostrará nada.

Podemos definir varias veces un mismo tipo, por ejemplo:
  MountPoint /boot
  MountPoint /var/log

Podemos usar la opción:
  IgnoreSelected true
Para sacar la info de todas las particiones menos alguna.

Si no definimos ningún Device, MountPoint o FSType, nos sacará todas (independientemente de lo que pongamos en IgnoreSelected)


Muy útil la opción 
  ValuesPercentage true
Para sacar los valores en porcentaje
