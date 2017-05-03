https://coreos.com/os/docs/latest/customizing-docker.html


CUIDADO! cualquiera puede enviarle comandos
Mensaje que da docker
May 03 14:21:35 app8 dockerd[13459]: time="2017-05-03T14:21:35.264831061-05:00" level=warning msg="[!] DON'T BIND ON ANY IP ADDRESS WITHOUT setting -tlsverify IF YOU DON'T KNOW WHAT YOU'RE DOING [!]"


# CentOS 7
systemctl edit docker
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375



# Con systemd
Parece que con centos7 no tira
/etc/systemd/system/docker-tcp.socket
[Unit]
Description=Docker Socket for the API

[Socket]
ListenStream=2375
BindIPv6Only=both
Service=docker.service

[Install]
WantedBy=sockets.target


systemctl enable docker-tcp.socket
systemctl stop docker
systemctl start docker-tcp.socket
systemctl start docker


docker -H tcp://127.0.0.1:2375 ps

