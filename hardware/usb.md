http://www.linuxvoice.com/drive-it-yourself-usb-car-6/
Descripción de como funciona usb y ejemplo de reverse-engineering de un dispositivo simple.

http://www.beyondlogic.org/usbnutshell
Descripción completa del protocolo usb.


# Linux
lsusb
  list usb devices

Permitir a un grupo de usuario acceso a los dispositivos usb
/lib/udev/rules.d/99-usbcar.rules
SUBSYSTEM=="usb", ATTRS{idVendor}=="0a81", ATTRS{idProduct}=="0702", GROUP="INSERT_HERE", MODE="0660"



# UsbRedir
https://www.spice-space.org/page/UsbRedir

Redirigir un dispositivo USB a través de la red.
Se usa, por ejemplo, con qemu o para VNC.
