http://www.iptables.info/en/iptables-matches.html

Match del owner:
iptables -t mangle -A POSTROUTING -m owner --uid-owner 43 -j LOG --log-uid

