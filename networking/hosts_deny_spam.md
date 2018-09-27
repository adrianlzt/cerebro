https://raw.githubusercontent.com/hectorm/hblock/master/hblock

Programa para mantener el /etc/hosts con una lista de dominios spam

sudo curl https://raw.githubusercontent.com/hectorm/hblock/master/hblock -o /usr/local/bin/hblock
sudo chmod a+x /usr/local/bin/hblock


Tienen tambien un .service y .timer para cronificarlo con systemd (hacerlo con --user)
