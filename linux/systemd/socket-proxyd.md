# Redirección de tráfico
https://gist.github.com/adrianlzt/7a8cc77c76d88179f5e30a28da87176b


/etc/systemd/system/test.socket
[Socket]
ListenStream=1234

[Install]
WantedBy=sockets.target



/etc/systemd/system/test.service
[Service]
ExecStart=/usr/lib/systemd/systemd-socket-proxyd 73.223.250.65:80

[Install]
WantedBy=multi-user.target




sudo systemctl start test.socket


curl localhost:1234 nos lleva a 73.223.250.65:80

Para pararlo
sudo systemctl stop test.socket
sudo systemctl stop test.service


Para activarlo:
sudo systemctl enable test.socket
sudo systemctl enable test.service
