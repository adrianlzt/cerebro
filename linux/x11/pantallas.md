http://bernaerts.dyndns.org/linux/74-ubuntu/309-ubuntu-dual-display-monitor-position-lost

Definicion de la posición de los monitores:
~/.config/monitors.xml

Comando para modificar dicha posicion:
xrandr --output LVDS1 --pos 1280x256 --output VGA1 --pos 0x0

  Pantalla externa (VGA1) a la izquierda
  Pantalla integrada (LVDS1) a la derecha, coincidiendo las partes inferiores.
