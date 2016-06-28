https://help.ubuntu.com/community/UFW

The default firewall configuration tool for Ubuntu is ufw. Developed to ease iptables firewall configuration, ufw provides a user friendly way to create an IPv4 or IPv6 host-based firewall. By default UFW is disabled.

Gufw is a GUI that is available as a frontend.

ufw allow from {your-ip} to any port 22
ufw allow 80
ufw allow 443
ufw enable
