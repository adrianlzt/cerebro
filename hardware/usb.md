http://www.linuxvoice.com/drive-it-yourself-usb-car-6/
Descripción de como funciona usb y ejemplo de reverse-engineering de un dispositivo simple.

http://www.beyondlogic.org/usbnutshell
Descripción completa del protocolo usb.

# OTG
OTG adapter has the “ID” signal pin connected to the GND pin internally.
Es el pin 4 de un conector microUSB.
Parece que los cables OTG simplemente hacen esa conexión y conviertens un conector micro en uno A.


# Linux
lsusb
  list usb devices
lsusb --tree

Permitir a un grupo de usuario acceso a los dispositivos usb
/lib/udev/rules.d/99-usbcar.rules
SUBSYSTEM=="usb", ATTRS{idVendor}=="0a81", ATTRS{idProduct}=="0702", GROUP="INSERT_HERE", MODE="0660"



# UsbRedir
https://www.spice-space.org/page/UsbRedir

Redirigir un dispositivo USB a través de la red.
Se usa, por ejemplo, con qemu o para VNC.


# Reset
https://askubuntu.com/a/661
Pequeño programa en c para conectar/desconectar un dispositivo USB

yay usbreset

Para conocer el bus y device: lsusb

sudo ./usbreset /dev/bus/usb/002/003

Obtener el path para un device id determinado
```
lsusb -d 10c4:ea60 | sed "s#Bus \([0-9]*\) Device \([0-9]*\).*#/dev/bus/usb/\1/\2#"
```
