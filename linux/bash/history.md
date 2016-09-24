Borrar cache de historial (todavía no guardado en el .bash_history):
history -c

Navegar hacia atrás búscando algo
Control+r escribir algo

Para ir hacia adelante http://stackoverflow.com/questions/791765/unable-to-forward-search-bash-history-similarly-as-with-ctrl-r
stty -ixon
Control+s

Desactivar historial
unset HISTFILE

Generalmente si escribimos
 comando
No se almacena en el history (pero puede estar quitada esta opcion)
  HISTCONTROL=ignorespace
  Tambien con: HISTCONTROL=ignoreboth (ignorespace and ignoredups)
