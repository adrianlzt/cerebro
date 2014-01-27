http://monkey.org/~dugsong/dsniff/

dsniff is a collection of tools for network auditing and penetration testing. dsniff, filesnarf, mailsnarf, msgsnarf, urlsnarf, and webspy passively monitor a network for interesting data (passwords, e-mail, files, etc.). arpspoof, dnsspoof, and macof facilitate the interception of network traffic normally unavailable to an attacker (e.g, due to layer-2 switching). sshmitm and webmitm implement active monkey-in-the-middle attacks against redirected SSH and HTTPS sessions by exploiting weak bindings in ad-hoc PKI.


# TCPKILL # Mirar también cutter.md o killcx.md (perl)
Viene en el paquete dsniff
O aislado aqui: https://github.com/chartbeat/tcpkill (necesita las librerias: libpcap-devel libnet-devel)
http://www.cyberciti.biz/howto/question/linux/kill-tcp-connection-using-linux-netstat.php

Usa expresiones tipo tcpdump

tcpkill -i eth0 port 21
tcpkill host 192.168.1.2

He intentado matar una conexión con tcpkill en la misma máquina y no lo he conseguido.
