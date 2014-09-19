http://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion-Builtins
http://www.cyberciti.biz/open-source/command-line-hacks/compgen-linux-command/

Mirar bash/autocompletar/

Listar todos los comandos, alias y funciones:
compgen -c

Listar los aliases, de user y de sistema
compgen -a
Mostrar alias con su definicion
alias

Variables
compgen -v

Todas las bash functions
compgen -A function

what commands have keybindings?
compgen -A binding

Directorios con los que se hará autocomplete (depende de donde estemos)
compgen -d

Ficheros:
compgen -f

Ficheros y directorios
compgen -fd
