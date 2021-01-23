Links varios:
https://marco.guardigli.it/2010/10/hacking-your-car.html
https://www.koreskoleservice.dk/images/produkter/hastighedsm%C3%A5lere/Canbus_montering.pdf
https://www.instructables.com/How-to-Hack-and-Upgrade-Your-Car-Using-CAN-Bus/
https://medium.com/@yogeshojha/car-hacking-101-practical-guide-to-exploiting-can-bus-using-instrument-cluster-simulator-part-i-cd88d3eb4a53
http://www.alfa147-france.net/forum/viewtopic.php?t=53974&postdays=0&postorder=asc&start=0
https://www.fiatforum.com/grande-punto/441845-project-hacking-fiat-grande-punto-can-bus-arduino-alfaobd-3.html
https://www.freecodecamp.org/news/hacking-cars-a-guide-tutorial-on-how-to-hack-a-car-5eafcfbbb7ec/
http://jeuazarru.com/wp-content/uploads/2015/11/CarHacking.pdf
https://www.youtube.com/watch?v=U1yecKUmnFo&t=27s
http://opengarages.org/handbook/ebook/
http://www.emotive.de/documents/WebcastsProtected/Transport-Diagnoseprotokolle.pdf
https://www.purplemeanie.co.uk/index.php/2019/09/07/ecu-diagnostics-part-4-wireshark-patching-and-obd-ii-results/



- Hay 4 variantes del CAN-BUS con diferentes longitudes de palabra y velocidad:

ISO 15765-4 CAN (11 bit ID,500 Kbaud)
ISO 15765-4 CAN (29 bit ID,500 Kbaud)
ISO 15765-4 CAN (11 bit ID,250 Kbaud)
ISO 15765-4 CAN (29 bit ID,250 Kbaud)

Según https://youtu.be/U1yecKUmnFo?t=81, suele haber dos CANbus, rápido y lento.
high speed can bus: C-CAN, donde se conectan ECM, BCM, transmission, brake
low speed can bus: B-CAN (single wired?): BCM, puertas, panel de instrumentos



# Terminadores de línea
Los adaptadores que conectamos al OBD2 deben llevar unas resistencias para hacer de terminadores del bus.
Esto no es correcto si queremos engancharnos en mitad del CANbus
https://github.com/norly/elmcan#a-note-on-can-bus-termination


# Linux

## virtualCan
Red virtual CAN
Nos puede servir para hacer pruebas sin tener ningún dispositivo can.

Cargar el módulo
sudo modprobe vcan
  en dmesg veremos "vcan: Virtual CAN interface driver"

Generar una interfaz y levantarla:
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0

Parece que el dispositivo hace echo de lo que le enviemos.




## Simulador
https://github.com/zombieCraig/ICSim

Creamos una virtual can y conectamos un "coche" virtual que podemos controlar.
La idea es luego escanear ese vcan y aprender a distinguir el ruido de la señal que buscamos.

Depdencias:
yay sdl2_image

make

Mostrar el "coche":
./icsim vcan0

Mostrar los controles:
./controls vcan0



## can-utils
Para interactura con el canbus usaremos el paquete can-utils

En Arch: yay can-utils-git

Send byte of information (0102030405060708) to can device with id = “01010101”:
cansend can0 01010101#0102030405060708

Receive everything on can0 interface:
candump can0

Para poder usar el protocolo ISO-TP (paquetes más largos) necesitamos un módulo extra del kernel
https://github.com/hartkopp/can-isotp

Para Arch:
aur/can-isotp-dkms-git



## wireshark
Plugin útil para encontrar cambios en paquetes de la red CAN.
Nos muestra una línea por cada ID y va marcando los bytes que se van modificando y el tiempo que llevan sin modificarse.

https://github.com/Polyconseil/wireshark-canvas

docker run --rm -it --entrypoint bash lsiobase/rdesktop-web:bionic
apt update
apt install -y git
git clone https://github.com/Polyconseil/wireshark-canvas.git
cd wireshark-canvas
apt build-dep wireshark
wget https://www.wireshark.org/download/src/all-versions/wireshark-2.4.15.tar.xz
wget --continue https://canlogger.csselectronics.com/files/wiresharkplugin/WS_v2.4-Plugin_v7.1.zip
  copia en este dir
tar xvf wireshark-2.4.15.tar.xz
apt install -y unzip; unzip WS_v2.4-Plugin_v7.1.zip
mkdir wireshark-2.4.15/plugins/canvas; mv WS_v2.4-Plugin_v7.1/WS_v2.4-Plugin_v7.1/CANvas-Wireshark-v2.4-Plugin-CSS-Electronics_v7.1/Source/* wireshark-2.4.15/plugins/canvas
cd wireshark-2.4.15 && patch -p1 -i ../add-canvas-plugin.patch
apt install -y libtool-bin libgtk2.0-dev libglib2.0-dev libtoolkit-perl libwscodecs1
./autogen.sh
./configure --with-gtk=2 --without-qt
make
make install
echo  /usr/local/bin/wireshark-gtk > /defaults/autostart





# Hardware

## Controladores
https://twitter.com/adafruit/status/1320506768959672333

## usb2can
Dispositivo de 8devices.com para comunicarnos con el canbus por USB

Guia:
https://www.8devices.com/media/products/usb2can/downloads/usb2can_user_guide.pdf
Copia en este dir


Estado de la interfaz:
ip link show can0

Modificar bitrate (mirar que bitrate usa nuestro canbus, por ejemplo en https://www.outilsobdfacile.com/vehicle-list-compatible-obd2/fiat)
sudo ip link set can0 up type can bitrate 125000
sudo ip link set can0 up type can bitrate 500000

Al poner mal un bitrate, en fiat ducato, me salían luces raras en el panel y mensajes extraños.

Opciones que podemos pasar:
ip link set can0 type can help

Poner el device en modo loopback (it is like the CAN interface TX pins are connected to its RX pins):
sudo ip link set can0 up type can loopback on

Si vemos comportamientos extraños (dejamos de recibir paquetes, o errores), desconectar el usb y volverlo a conectar.

Para recibir paquetes la llave debe estar en activo (sin arrancar el coche, pero con las luces del panel encedidas)

Parar la interfaz:
sudo ip link set can0 down
