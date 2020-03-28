El servidor cups lo podemos ver en: http://localhost:631

https://wiki.archlinux.org/index.php/CUPS#CUPS_administration
Si no tenemos permisos de administracion:
# groupadd printadmin
# gpasswd -a username printadmin       # for printer administration
# gpasswd -a username lp               # for printing priviledges


/etc/cups/cups-files.conf
SystemGroup sys root printadmin

systemctl restart org.cups.cupsd.service

pacman -S hplip
  para tener impresoras hp laserjet



Para poder buscar impresora (avahi/bonjour) tiene que estar levantado:
systemctl start avahi-daemon
avahi-discover

Resolver la IP de los dominios encontrados por avahi
avahi-resolve --name ddprinter.local

Tenemos que tener instalado (https://wiki.archlinux.org/index.php/Avahi#Hostname_resolution)
nss-mdns
Y configurado el /etc/nsswitch.conf con
hosts: files mymachines myhostname mdns_minimal [NOTFOUND=return] resolve [!UNAVAIL=return] dns


Estado impresoras:
lpstat -s
lpstat -p
  más info sobre posibles errores


Es probable que tengamos que instalar drivers para la impresora.


# Ubuntu
Para configurar una impresora
system-config-printer
