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


Si no, activar ese modo:
$ sudo ip link set wwan0 down
$ echo 'Y' | sudo tee /sys/class/net/wwan0/qmi/raw_ip
$ sudo ip link set wwan0 up


Conectar, debemos especificar el APN
sudo qmicli -p -d /dev/cdc-wdm0 --device-open-net='net-raw-ip|net-no-qos-header' --wds-start-network="apn='YOUR_APN',ip-type=4" --client-no-release-cid

A orange.fr, con user y password
sudo qmicli -p -d /dev/cdc-wdm0 --device-open-net='net-raw-ip|net-no-qos-header' --wds-start-network="apn='orange',username='orange',password='orange',ip-type=4" --client-no-release-cid


Si me da este error puede ser por falta de cobertura (antena conectada?) o probleamas con la SIM (https://community.sixfab.com/t/error-couldnt-start-network-qmi-protocol-error-14-callfailed/1285 un tipo que dice que Verizon bloqueaba el IMEI por no estar certificado).
error: couldn't start network: QMI protocol error (14): 'CallFailed'
call end reason (3): generic-no-service


Si conecta correctamente veremos algo tipo:
[/dev/cdc-wdm0] Network started
        Packet data handle: '2264933824'
[/dev/cdc-wdm0] Client ID not released:
        Service: 'wds'
            CID: '21'


Para conseguir una ip:
sudo dhclient wwp0s20f0u2u1i5

Tras un rato intentándolo desiste por no recibir ningúna oferta.

Para debian en raspberry parece que usan una versión reducida del dhcp
sudo udhcpc -q -f -i wwan0


Otros comandos útiles de qmicli:
sudo qmicli -d /dev/cdc-wdm0 --nas-get-signal-info
sudo qmicli -d /dev/cdc-wdm0 --nas-get-signal-strength
sudo qmicli -d /dev/cdc-wdm0 --nas-get-home-network
sudo qmicli -d /dev/cdc-wdm0 --nas-get-serving-system
sudo qmi-network /dev/cdc-wdm0 status
sudo qmicli -d /dev/cdc-wdm0  --wds-get-packet-service-status
