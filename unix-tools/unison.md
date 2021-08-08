https://github.com/bcpierce00/unison

File-synchronization tool. Allows two replicas of a collection of files and directories to be stored on different hosts

# Uso
https://wiki.archlinux.org/title/unison

Hace falta crear un profile.
Podemos crearlo con la UI unison-gtk2

Un profile será el sync de un directorio entre dos pcs.


Una vez existe el profile puedo ejecutarlo con la cli:
unison -auto arco-archer-notas
  -auto: automatically accept default (nonconflicting) actions
