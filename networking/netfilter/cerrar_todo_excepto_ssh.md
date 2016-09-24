iptables -A INPUT -p tcp -m tcp -m multiport --dports 22 -j ACCEPT
iptables -A INPUT -m conntrack -j ACCEPT  --ctstate RELATED,ESTABLISHED
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -j DROP
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -j DROP
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -j DROP
