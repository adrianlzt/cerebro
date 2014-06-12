Sintaxis:
user    MACHINE=COMMANDS

Permitir a los usuarios de "grupo" hacer sudo contra todos los comandos.
%grupo ALL=(ALL) ALL

Quitar el parámetro requiretty para el user nrpe. Permite ejecutar en todos los hosts (ALL) el comando corosync-cfgtool como root
Defaults:nrpe !requiretty
nrpe ALL = (root) NOPASSWD: /usr/sbin/corosync-cfgtool -s

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
