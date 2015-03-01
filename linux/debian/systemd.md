Activar:
apt-get install systemd

/etc/default/grub
change the line:
GRUB_CMDLINE_LINUX=""
to:
GRUB_CMDLINE_LINUX="init=/bin/systemd" 

update-grub2

Reboot 
