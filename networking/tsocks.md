DEPRECATED mirar socksify.md

http://alexborisov.org/tunnel-your-apps-via-ssh-with-tsocks/

pacman -S tsocks
ssh -D 1080 user@maquinasalto

vi /etc/tsocks.conf
server = 127.0.0.1
server_port = 1080

tsocks curl eth0.me
  deberiamos ver la ip de maquinasalto

