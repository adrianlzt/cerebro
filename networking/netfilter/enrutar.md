http://www.aboutdebian.com/proxy.htm

Usamos NAT
----------------
|192.168.1.0/255|---eth2---IPTABLES---eth1---Internet
----------------
# iptables -A FORWARD -o eth1 -i eth2 -j ACCEPT
# iptables -A FORWARD -i eth1 -o eth2 -m state --state ESTABLISHED,RELATED -j ACCEPT
# iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE


# FWD: Allow all connections OUT and only existing and related ones IN
iptables -A FORWARD -i $EXTIF -o $INTIF -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -i $INTIF -o $EXTIF -j ACCEPT

# Enabling SNAT (MASQUERADE) functionality on $EXTIF
iptables -t nat -A POSTROUTING -o $EXTIF -j MASQUERADE
