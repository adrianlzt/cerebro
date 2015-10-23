http://linuxpoison.blogspot.com.es/2010/11/how-to-limit-network-access-by-user.html

Se puede filtrar por UID, GID, PID, o SID (session ID)

Es necesario cargar un módulo: modprobe ipt_owner

Ejemplo:
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -o eth0 -m owner --uid-owner nikesh  -j ACCEPT
iptables -A OUTPUT -j DROP
