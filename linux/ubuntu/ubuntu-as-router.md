https://help.ubuntu.com/community/Router

iptables/redireccionar_trafico.md


No podemos redirigir tráfico a una máquina que no esté en nuestra subred.
Mirar ssh/sshuttle.md para encaminar las conex via ssh


Si solo queremos comunicar dos interfaces, para que los nodos conectados a una interfaz puedan hablar con los nodos de la otra interfaz:
sysctl -w net.ipv4.ip_forward=1

Para hacerlo persistente:
/etc/sysctl.conf
net.ipv4.ip_forward = 1


# SNAT
Para una máquina que tiene varias interfaces.
Por ejemplo tiene la red 10.0.2.0/24 configurada en eth1
Por eth0 se sale a internet
root@ubuntu-maas:~# iptables -t nat -A POSTROUTING -s 10.0.2.0/24 -o eth0 -j MASQUERADE

Con esta regla le decimos que todo el tráfico de 10.0.2.0/24 salga por la interfaz eth0 y que se aplique MASQUERADE (se ponga como la ip origen la ip que tenga en ese momento la eth0; esto es por si dicha ip es dinamica)


# Router wifi con OpenWRT
20€
http://es.aliexpress.com/item/GL-iNet-6416A-150Mbps-802-11g-b-n-SMART-Mini-WiFi-Wireless-Router-OPENWRT-ENGLISH-Firmware/32273181856.html
