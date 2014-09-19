http://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion-Builtins
https://sixohthree.com/867/bash-completion


Ejemplo:
Cuando escribamos "comando1" y demos al tabulador, nos pondrá "comando "

_nombre_func() {
  local cur
  cur=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $( echo "comando" ) )
}
complete -F _nombre_func comando1 comando2 comando3


Cuando escribimos "comando1" y pulsamos tabulador nos completa con los elementos de la primera columna de ~/.hostaliases que no sean vacias o tengan un comentario.
Si ponemos "comando1 ja" y pulsamos tabulador solo nos mostrará las que empiecen por "ja".
_nombre_func() {
  local cur
  cur=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $( cat ~/.hostaliases | egrep -v -e "^$" -e "^#" | cut -d ' ' -f 1 | grep "^$cur" ) )
}
complete -F _nombre_func comando1 comando2 comando3


# Completar con hosts, ficheros y directorios para scp
_completar_scp() {
  local cur
  cur=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $( cat ~/.hostaliases | egrep -v -e "^$" -e "^#" | cut -d ' ' -f 1 | grep "^$cur" ) )
  COMPREPLY+=($(compgen -df $cur))
}
complete -F _completar_scp scp

