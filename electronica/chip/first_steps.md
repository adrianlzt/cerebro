# Conexión via su puerto microUSB

El dmesg nos dice:
usb 2-1: new high-speed USB device number 7 using xhci_hcd
cdc_acm 2-1:1.2: ttyACM0: USB ACM device
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
cdc_ether 2-1:1.0 usb0: register 'cdc_ether' at usb-0000:00:14.0-1, CDC Ethernet Device, be:30:b7:25:c9:02
usbcore: registered new interface driver cdc_ether
cdc_ether 2-1:1.0 enp0s20u1: renamed from usb0
IPv6: ADDRCONF(NETDEV_UP): enp0s20u1: link is not ready


Esto monta un interfaz USB-Ethernet, que no tengo muy claro como se usa.

Podemos usar el interfaz usb-serial para conectar:
sudo screen /dev/ttyACM0 115200
Veremos la pantalla de login y ya estaremos dentro.


Si queremos hacer uso de la interfaz USB-Ethernet.
En mi caso, no se si siempre, el cacharro se había puesto la ip
169.254.10.53/16
Configurando la interfaz enp0s20u1 con la ip
169.254.10.54/16
Para encontrar que ip tiene CHIP:
nmap -sP 169.254.10.53/16

entrar por ssh:
ssh chip@169.254.a.b
pass: chip

# Wifi
sudo nmcli device wifi connect '(your wifi network name/SSID)' ifname wlan0
sudo nmcli device wifi connect '(your wifi network name/SSID)' password '(your wifi password)' ifname wlan0


# Zona horaria
dpkg-reconfigure tzdata


# Hardware test
# Turn on wlan0...OK
# Turn on wlan1...OK
# Hardware list...OK
# I2C bus 0...OK
# I2C bus 1...OK
# I2C bus 2...OK
# testing AXP209 on I2C bus 0...OK
# GPIO expander test...OK
# Doing 10s stress test...OK
# Wifi enumeration test...OK
# Checking bit flips on NAND... 0 143.5 4.73814
# Checking bad blocks on NAND... 3 0
### ALL TESTS PASSED ###

