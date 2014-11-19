# iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
# service iptables save

equivalente a:

# firewall-cmd --add-service=http
# firewall-cmd --permanent --add-service=http
