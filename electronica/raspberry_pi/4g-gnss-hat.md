https://www.waveshare.com/sim7600g-h-4g-hat-b.htm
https://www.waveshare.com/wiki/SIM7600G-H_4G_HAT_(B)

Lo conectamos a raspi usando los pin pogo.

Explicación de las opciones para configurar el modem 4G con una raspi
https://www.jeffgeerling.com/blog/2022/using-4g-lte-wireless-modems-on-raspberry-pi


Usando los pines pogo, conectando un cargador de 3A al PWR-IN, no veo el modem con lsusb.
Igual conectando el cargador al USB-IN.


# Linux
Al conectarlo vemos que aparece en el dmesg una nueva interfaz
usb 1-2.1: new high-speed USB device number 66 using xhci_hcd
usb 1-2.1: New USB device found, idVendor=1e0e, idProduct=9001, bcdDevice= 3.18
usb 1-2.1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
usb 1-2.1: Product: SimTech, Incorporated
usb 1-2.1: Manufacturer: SimTech, Incorporated
usb 1-2.1: SerialNumber: 0123456789ABCDEF
option 1-2.1:1.0: GSM modem (1-port) converter detected
usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB2
option 1-2.1:1.1: GSM modem (1-port) converter detected
usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB3
option 1-2.1:1.2: GSM modem (1-port) converter detected
usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB4
option 1-2.1:1.3: GSM modem (1-port) converter detected
usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB5
option 1-2.1:1.4: GSM modem (1-port) converter detected
usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB6
qmi_wwan 1-2.1:1.5: cdc-wdm0: USB WDM device
qmi_wwan 1-2.1:1.5 wwan0: register 'qmi_wwan' at usb-0000:00:14.0-2.1, WWAN/QMI device, ca:40:8a:7e:44:e7
qmi_wwan 1-2.1:1.5 wwp0s20f0u2u1i5: renamed from wwan0

Con lsusb veo:
Bus 001 Device 066: ID 1e0e:9001 Qualcomm / Option SimTech, Incorporated

/dev/cdc-wdm0

Con el comando ip veo
29: wwp0s20f0u2u1i5: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether ca:40:8a:7e:44:e7 brd ff:ff:ff:ff:ff:ff


La activo:
sudo ip link set wwp0s20f0u2u1i5 up

Comprobar que el led de network parpadea.
Si no puede ser que no tenga cobertura (antena conectada?)


# Modos
## ECM
La tarjeta se comporta como un router, dándonos una IP interna y obteniendo él la IP pública.
Veremos la tarjeta como una interfaz usb0
Mejor QMI


## QMI
Veremos la tarjeta como un modem, configurando la IP pública directamente en nuestro equipo.


Script que hace la conex:
https://github.com/penguin2716/qmi_setup/blob/master/qmi_setup.sh

Conex paso a paso:
https://forum.sierrawireless.com/t/registration-denied-error-on-em7565/18669

Conversación interesante sobre como conectar, autoconnect, etc
https://forum.sierrawireless.com/t/how-to-properly-disconnect-from-carrier-network/22263/3


Comprobar el estado (no me funcionó una primera vez, no se si hace falta el ip .. up)
➜ sudo qmicli -d /dev/cdc-wdm0 --dms-get-operating-mode
[/dev/cdc-wdm0] Operating mode retrieved:
        Mode: 'online'
        HW restricted: 'no'

Tiene que estar en "raw-ip" (la mía ya estaba así)
Consultar:
sudo qmicli -d /dev/cdc-wdm0 --wda-get-data-format
...
               Link layer protocol: 'raw-ip'


qmicli -d /dev/cdc-wdm0 --nas-get-serving-system
esto debe dar registered


Si no, activar ese modo:
$ sudo ip link set wwan0 down
$ echo 'Y' | sudo tee /sys/class/net/wwan0/qmi/raw_ip
$ sudo ip link set wwan0 up


Crear un fichero con la config y usar
sudo qmi-network --profile=./profile /dev/cdc-wdm0 start

profile:
APN=orange
APN_USER=orange
APN_PASS=orange
IP_TYPE=4



Si me da este error puede ser por falta de cobertura (antena conectada?) o probleamas con la SIM (https://community.sixfab.com/t/error-couldnt-start-network-qmi-protocol-error-14-callfailed/1285 un tipo que dice que Verizon bloqueaba el IMEI por no estar certificado).
error: couldn't start network: QMI protocol error (14): 'CallFailed'
call end reason (3): generic-no-service


Mirar si al hacer el start da algún error.
Si da este:
error: cannot set expected data format: Failed to write to sysfs file '/sys/class/net/wwp0s20f0u2u1i5/qmi/raw_ip': Dispositivo o recurso ocupado
Error updating kernel link layer protocol

Tuve que parar el qmi-network, luego hacer:
sudo ip link set wwp0s20f0u2u1i5 down
Y cambié el formato:
sudo qmicli -d /dev/cdc-wdm0 -E raw-ip

Creo que tras cambiar eso ahora la interfaz sale distinta:
29: wwp0s20f0u2u1i5: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UNKNOWN group default qlen 1000
    link/none




sudo qmicli -d /dev/cdc-wdm0 --wds-get-packet-service-status
esto me da connected



Esto no tengo claro si fue necesario (tal vez antes del qmi-network?):
sudo qmicli -d /dev/cdc-wdm0  --dms-set-operating-mode=online


sudo qmicli -d /dev/cdc-wdm0 -e
    si me da 802-3, cambiar a raw-ip
    en principio qmi-network gestiona este cambio
sudo qmicli -d /dev/cdc-wdm0 -E raw-ip
  tengo que hacer stop a qmi-network para poder ejecutar ese comando y poner a down la interfaz



Para conseguir una ip:
sudo dhcpcd -4 wwp0s20f0u2u1i5

Me da timeout.
Y al cabo de unos segundos el wds-get-packet-service-status me da disconnected.
Según este hilo dhcpcd no es compatible con estas interfaces
https://forum.sierrawireless.com/t/linux-dhcp-cannot-get-ip-address-em7430/9541/2
Creo que este timeout era por no tener puesto lo de "raw-ip"
Aunque al solucionar eso, avanza un poco más, dice:
wwp0s20f0u2u1i5: waiting for 3rd party to configure IP address
timed out
Pero vuelve a dar el timeout.


Con udhcpc (busybox) si funciona
sudo busybox udhcpc -f -i wwp0s20f0u2u1i5
udhcpc: broadcasting discover
udhcpc: broadcasting select for 10.142.16.148, server 10.142.16.149
udhcpc: lease of 10.142.16.148 obtained from 10.142.16.149, lease time 7200

En realidad no se si me sirve de algo ejecutar este udhcpc, o me vale con mirar la config con el wds-get-current-settings.

Pero no me configura la interfaz
Configurándola a mano
sudo ip a a 10.142.16.148 dev wwp0s20f0u2u1i5

Esto si funciona!

Puedo probar metiendo la ruta de eth0.me a fuego
sudo ip route add 5.132.162.27/32 dev wwp0s20f0u2u1i5

Y comprobando que salgo con otra ip
curl eth0.me


Si me está fallando, mirar que --wds-get-packet-service-status sigue connected.


Para ver la config IP del modem (será la misma IP que coja el dhclient)
sudo qmicli -d /dev/cdc-wdm0 --wds-get-current-settings


Para parar:
sudo qmi-network --profile=./profile /dev/cdc-wdm0 stop
sudo ip link set wwp0s20f0u2u1i5 down



Otros comandos útiles de qmicli:
sudo qmicli -d /dev/cdc-wdm0 --nas-get-signal-info
sudo qmicli -d /dev/cdc-wdm0 --nas-get-signal-strength
  >-73 excelente
  >-83 buena
  >-93 ok
  >-109 mala
sudo qmicli -d /dev/cdc-wdm0 --nas-get-home-network
sudo qmicli -d /dev/cdc-wdm0 --nas-get-serving-system
sudo qmi-network /dev/cdc-wdm0 status
sudo qmicli -d /dev/cdc-wdm0  --wds-get-packet-service-status
