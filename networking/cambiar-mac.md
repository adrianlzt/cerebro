http://www.aboutlinux.info/2005/09/how-to-change-mac-address-of-your.html
https://en.wikibooks.org/wiki/Changing_Your_MAC_Address/Linux

sudo ip link set eno1 down
sudo ip link set eno1 address 80:ce:62:3a:79:98
sudo ip link set eno1 up


ifconfig eth0 down
ifconfig eth0 hw ether 00:80:48:BA:d1:30
ifconfig eth0 up


Ejemplo mac Apple iPhone
00:26:08:94:D9:98


Chequear fabricantes MAC
https://dnschecker.org/mac-lookup.php
