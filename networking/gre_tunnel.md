http://www.tldp.org/HOWTO/Adv-Routing-HOWTO/lartc.tunnel.gre.html
http://ask.xmodulo.com/create-gre-tunnel-linux.html

Comprobar que tenemos el módulo necesario:
lsmod  | grep ip_gre

Si no está cargado, lo cargamos:
modprobe ip_gre
Nos crea las interfaces greo0 y gretap0


Configurar con script de inicio:

/etc/sysconfig/network-scripts/ifcfg-vpc
DEVICE=tungre
BOOTPROTO=none
ONBOOT=no
TYPE=GRE
PEER_OUTER_IPADDR=52.26.93.113
PEER_INNER_IPADDR=192.168.168.1
MY_INNER_IPADDR=192.168.168.2
MY_OUTER_IPADDR=52.24.132.107

52.26.93.113 es la ip pública del otro nodo
192.168.168.2 es una ip interna para la interfaz tungre
192.168.168.1 es la interfaz interna de la interfaz tungre del otro nodo

En el otro nodo la configuración será:
/etc/sysconfig/network-scripts/ifcfg-vpc
DEVICE=tungre
BOOTPROTO=none
ONBOOT=no
TYPE=GRE
PEER_OUTER_IPADDR=52.24.132.107
PEER_INNER_IPADDR=192.168.168.2
MY_INNER_IPADDR=192.168.168.1
MY_OUTER_IPADDR=52.26.93.113


ifup vpc


La configuración con comandos ip no consigo que me funcione.
