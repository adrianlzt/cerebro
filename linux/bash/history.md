Borrar cache de historial (todavía no guardado en el .bash_history):
history -c

Navegar hacia atrás búscando algo
Control+r escribir algo

Para ir hacia adelante http://stackoverflow.com/questions/791765/unable-to-forward-search-bash-history-similarly-as-with-ctrl-r
stty -ixon
Control+s

Desactivar historial
set +o history
unset HISTFILE
  este en bash no me funciona

Generalmente si escribimos
 comando
No se almacena en el history (pero puede estar quitada esta opcion)
  HISTCONTROL=ignorespace
  Tambien con: HISTCONTROL=ignoreboth (ignorespace and ignoredups)

Mostrar la fecha en el history
export HISTTIMEFORMAT="%d/%m/%y %T "
Ejemplo salida:
  623  07/07/21 11:26:05 history
  624  07/07/21 11:26:39 history | tail
