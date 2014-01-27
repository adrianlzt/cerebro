http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_02_03.html
bash -x script.sh

Para los scripts de init.d mejor
sh -x /etc/init.d/daemon

Short  | Long 			Description
set -f | set -o noglob		Disable file name generation using metacharacters (globbing).
set -v | set -o verbose		Prints shell input lines as they are read.
set -x | set -o xtrace		Print command traces before executing command.

Para ejecutar un script parando en casa linea
#!/bin/bash
set -x
trap read debug
