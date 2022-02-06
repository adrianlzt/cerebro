https://variwiki.com/index.php?title=Wifi_NetworkManager#Creating_WiFi_AP

nmcli con add type wifi ifname wlan0 mode ap con-name <name> ssid <ssid>
nmcli con modify <name> 802-11-wireless-security.key-mgmt wpa-psk
nmcli con modify <name> ipv4.method shared

nmcli con modify <name> 802-11-wireless.band bg
nmcli con modify <name> 802-11-wireless.channel <channel>
si queremos definir el canal

By default 10.42.0.x/24 subnet is used by NetworkManager DHCP server


Parece que no hay un método para ver directamente los clientes conectados.
Podemos ver el "lease" file de dhcp (para raspberry con NetworkManager en)
/var/lib/NetworkManager/dnsmasq-ap0.leases

O mirar la tabla arp
arp | grep -v incomplete
