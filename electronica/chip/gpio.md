XIO-P0 -> gpio1013
XIO-P1 -> gpio1014
XIO-P2 -> gpio1015
XIO-P3 -> gpio1016
XIO-P4 -> gpio1017
XIO-P5 -> gpio1018
XIO-P6 -> gpio1019
XIO-P7 -> gpio1020


Leer valores de una pata gpio (XIO-P7, para kernel 4.4.13-ntc-mlc):
echo 1020 > /sys/class/gpio/export
cat /sys/class/gpio/gpio1020/direction
  debe devolver "in", modo lectura
cat /sys/class/gpio/gpio1020/value
  leer valor (1 por defecto, 0 si lo conectamos a GND)

Poner en modo write/out/salida
echo out > /sys/class/gpio/gpio1020/direction

Poner en modo ON
echo 1 > /sys/class/gpio/gpio1020/value



Ver que pines estan siendo leidos:
ls -d /sys/class/gpio/gpio[0-9]*

Desactivar
echo "1013" > /sys/class/gpio/unexport

