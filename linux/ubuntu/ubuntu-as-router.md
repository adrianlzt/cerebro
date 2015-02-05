https://help.ubuntu.com/community/Router

iptables/redireccionar_trafico.md



Si solo queremos comunicar dos interfaces, para que los nodos conectados a una interfaz puedan hablar con los nodos de la otra interfaz:
sysctl -w net.ipv4.ip_forward=1

Para hacerlo persistente:
/etc/sysctl.conf
net.ipv4.ip_forward = 1

Solo hace falta esto??
