Mirar gosu.md si tenemos problemas con como se comporta sudo.

http://linux.die.net/man/5/sudoers
http://www.sudo.ws/sudoers.man.html

Cuidado con la preferencia de las reglas. Las útimas (más abajo en el fichero) tienen preferencia. A lo mejor das unos permisos a un usuario pero los sobreescribe un grupo después.

Cuidado con dar acceso a programas que otorguen shell.
Por ejemplo, dar permiso a: vi /etc/services
ERROR! porque el usuario podrá hacer: :!bash y estara con shell de root
Para editar ficheros usar:
testuser    ALL = (root) NOPASSWD: sudoedit /etc/services

Y el usuario tendrá que usar: sudoedit /etc/services




Editar siempre con visudo.
O si queremos editar un fichero en particular:
visudo -f /etc/sudoers.d/fichero


Sintaxis:
user    MACHINES= (como_que_usuario) FLAGS: COMMANDS
  en FLAGS puede ir por ejemplo NOPASSWD

dgb     boulder = (operator) /bin/ls, /bin/kill, /usr/bin/lprm
The user dgb may run /bin/ls, /bin/kill, and /usr/bin/lprm—but only as operator in host boulder

Permitir a un usuario todos los comandos sin password
NOMBRE ALL=(ALL) NOPASSWD: ALL

Permitir a los usuarios de "grupo" hacer sudo contra todos los comandos.
%grupo ALL=(ALL) ALL

Quitar el parámetro requiretty para el user nrpe. Permite ejecutar en todos los hosts (ALL) el comando corosync-cfgtool como root
Defaults:nrpe !requiretty
nrpe ALL = (root) NOPASSWD: /usr/sbin/corosync-cfgtool -s

Con expr regular en el comando:
Defaults:nrpe !requiretty
nrpe ALL = (root) NOPASSWD: /sbin/ip netns exec * /usr/lib64/nagios/plugins/check_ping *

Quitar requiretty solo para un comando:
Defaults!/usr/lib64/nagios/plugins/check_service.py !requiretty
nrpe  ALL=(ALL) NOPASSWD: /usr/lib64/nagios/plugins/check_service.py

Truco de sudo: se puede hacer un include de un directorio y que parezca un comentario:
#include /etc/sudoers.local


Apaño para escribir en un fichero como root
echo "contenido" | sudo tee -a fichero >& /dev/null


Ejecutar comandos en una máquina con sudo sin entrar: http://www.shermann.name/2011/02/sudo-over-ssh-magic.html
ssh -t -t -t $host sudo -S command <<EOF
<enter your password here>
EOF


# X11
Arrancar aplicaciones x11 como root:
https://wiki.archlinux.org/index.php/Running_X_apps_as_root

gksu xeyes

# Debug
/etc/sudo.conf
Debug sudo /var/log/sudo_debug all@debug

debug saca muuuucha informacion. Orden:
crit, err, warn, notice, diag, info, trace and debug

