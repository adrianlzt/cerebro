http://serverfault.com/questions/192893/how-i-can-identify-which-process-is-making-udp-traffic-on-linux


Encontrar que proceso esta generando trafico UDP:

auditctl -a exit,always -F arch=b64 -F a0=2 -F a1=2 -S socket -k SOCKET
ausearch -i -ts today -k SOCKET

