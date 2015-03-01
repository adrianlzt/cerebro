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


# Ubuntu
Para configurar una impresora
system-config-printer
