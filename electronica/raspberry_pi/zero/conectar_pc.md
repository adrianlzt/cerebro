http://blog.gbaman.info/?p=699
http://www.recantha.co.uk/blog/?p=15566
https://desertbot.io/blog/ssh-into-pi-zero-over-usb

Como configurar el SO para poder conectarla a un pc y acceder via ssh.



1.- Flashea Raspbian (os.md)
2.-
  sudo mount /dev/mmcblk0p2 /mnt/pendrive/
  sudo mount /dev/mmcblk0p1 /mnt/pendrive/boot
3.- En la particion boot:
    esto creo que es para poder conectar la pizero por usb al pc
    echo "dtoverlay=dwc2" >> config.txt
    vi cmdline.txt
    Insert 'modules-load=dwc2,g_ether' after 'rootwait'

    touch ssh   # para tener server ssh

    También podemos meter en la partición boot un fichero para conectar a una wifi
    wpa_supplicant.conf
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    country=ES
    update_config=1

    network={
     ssid="<Name of your wireless LAN>"
     psk="<Password for your wireless LAN>"
    }
4.- Desmontar la microsd y meterla en la raspizero
5.- Conectar la raspizero al pc con un cable microusb (puerto USB de la raspizero)


Podemos conectar un teclado con un adaptador OTG

Nos aparecerá un adaptador ethernet nuevo en nuestro pc (ejemplo enp0s20f0u2)
Mirar en el dmesg por un mensaje tipo:
cdc_ether 1-2:1.0 usb0: register 'cdc_ether' at usb-0000:00:14.0-2, CDC Ethernet Device, ba:fa:8b:53:ec:5c

PROBLEMA, me dice que la interfaz no está lista, NO_CARRIER, y no veo a la raspi.

Para buscar la ip de la raspizero:
nmap -sP 169.254.10.54/16


Por defecto:
ssh pi@IP
password: raspberry
