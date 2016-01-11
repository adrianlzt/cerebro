https://wiki.archlinux.org/index.php/Netctl_(Espa%C3%B1ol)

netctl es una herramienta basada en CLI («intérprete de línea de órdenes», esto es, a través de consola)) utilizada para configurar y gestionar las conexiones de red mediante perfiles. Es la apuesta de Arch Linux para sustituir a netcfg. netctl supone el futuro (y el presente) de la gestión de conexiones de red.


cd /etc/netctl
cp examples/uno_parecido nuestra_conex

vi nuestra_conex
cambiar parametros

netctl enable nuestra_conex

Nos crea un service systemctl
