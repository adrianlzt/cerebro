https://serverfault.com/questions/362529/how-can-i-sniff-the-traffic-of-remote-machine-with-wireshark

mkfifo /var/tmp/wire
ssh HOST "tcpdump -s 0 -U -n -w - -i any" > /var/tmp/wire
wireshark-gtk -k -i /var/tmp/wire
