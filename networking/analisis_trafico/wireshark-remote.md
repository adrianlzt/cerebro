Ver captura remota
http://wiki.wireshark.org/CaptureSetup/Pipes
wireshark -k -i <(ssh compaq "dumpcap -P -w - -i any -f 'not tcp port 22'")
wireshark-gtk -k -i <(ssh REMOTEHOST "tcpdump -w - -i enp4s0f1 not tcp port 22")

Para usar dumpcap:
apt-get install wireshark-common

Si no podemos hacer ssh como root tendremos que permitir a un usuario normal tener permisos para capturar con dumpcap
setfacl -m u:adrian:rx /usr/bin/dumpcap
setcap "CAP_NET_RAW+eip" /usr/bin/dumpcap




https://serverfault.com/questions/362529/how-can-i-sniff-the-traffic-of-remote-machine-with-wireshark

mkfifo /var/tmp/wire
ssh HOST "tcpdump -s 0 -U -n -w - -i any" > /var/tmp/wire
wireshark-gtk -k -i /var/tmp/wire
