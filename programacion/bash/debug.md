http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_02_03.html
bash -x script.sh

Para los scripts de init.d mejor
sh -x /etc/init.d/daemon

Short  | Long 			Description
set -f | set -o noglob		Disable file name generation using metacharacters (globbing).
set -v | set -o verbose		Prints shell input lines as they are read.
set -x | set -o xtrace		Print command traces before executing command.

Use set -e
Every script you write should include set -e at the top. This tells bash that it should exit the script if any statement returns a non-true return value. The benefit of using -e is that it prevents errors snowballing into serious issues when they could have been caught earlier. Again, for readability you may want to use set -o errexit.
CUIDADO con grep: Since grep returns an exit status of 1 when it doesn't find any match, it can cause -e to terminate the script even when there wasn't a real "error".
http://stackoverflow.com/questions/9952177/whats-the-meaning-of-the-parameter-e-for-bash-shell-command-line

Para ejecutar un script parando en casa linea
#!/bin/bash
set -x
trap read debug

Para solo debuggear ciertas partes:
    set -x
    ls $dir \
        | grep pid \
        | grep -v daemon
    set +x

Imprimir nombre de la función
temporary_files() {
    echo $FUNCNAME $@


Bash debugger: http://bashdb.sourceforge.net/
apt-get install bashdb
bashdb script.sh

Comandos:
l .    listar alrededor de la línea donde estamos
n      linea siguiente
s      linea siguiente, entrar en función
b 192  breakpoint en linea 192 (acordarse de ponerlo en una linea donde pueda parar)
c      continuar hasta breakpoint
