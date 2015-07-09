# Ubuntu
sudo apt-get install tor

service tor start


# Arch
pacman -S tor
systemctl start tor
systemctl status tor
  para ver si arranca bien


# Centos / Fedora
https://www.torproject.org/docs/rpms.html.en
Necesitamos epel
yum install tor


Generalmente tarda unos minutos en conectar a la red.
Por defecto abre el socks en 9050

Conf: /etc/tor/torrc
Configuración que sobreescribe a la anterior (en Debian-like): /usr/share/tor/tor-service-defaults-torrc


Mirar el log para ver como va el arranque:
/var/log/tor/tor.log

Por defecto solo escucha en localhost.
Se cambia con:
/etc/tor/torrc
SocksPort 0.0.0.0:9050

Soltará un warninig advirtiendo del peligro de abrirlo a internet.



Mirar navegar.md
