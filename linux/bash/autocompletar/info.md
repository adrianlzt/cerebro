Se pueden crear autocompletar automáticos.
Pongo un fichero de ejemplo para clusterssh.

Para cargarlo, en .bashrc:
# completion personalizados
if [ -f ~/.bash_completion ] && ! shopt -oq posix; then
    . ~/.bash_completion
fi

Los autocompletion de bash se cargan mediante:
if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    . /etc/bash_completion
fi

/etc/bash_completion: . /usr/share/bash-completion/bash_completion

Y todos los completion estan en /usr/share/bash-completion/completions
