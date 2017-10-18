# Tirar paquetes con cierta probabilidad
iptables -A INPUT -m statistic --mode random --probability 0.1 -j DROP
iptables -A OUTPUT -m statistic --mode random --probability 0.1 -j DROP
