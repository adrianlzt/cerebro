git
  autocompletado de comandos git. Si va muy lento mirar gitfast

archlinux
  alias para comandos de pacman paclist pacin pacrep pacreps yalist yarep yareps
  parece que tambien me evita tener que poner sudo
  https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#archlinux

common-aliases
  unos aliases para ls
  tambien para pipes tipicas al final
  H, | head
  L, | less
  G, | grep
  LL2>&1, | less
  P, mostrar un stacktrace de python coloreado

dircycle
  control+shift+izq/dcha para movernos por el historial de directorios

docker
  autocompletado para docker

gpg-agent
  arranca el gpg-agent

httpie
  autocompletado para la cli http (curl for humans)

npm
  autocompletado para npm

pass
  autocompletado para pass

per-directory-history
  historial relativo a cada directorio. Se puede cambiar al historial global con control+g
  se almacenan en $HISTORY_BASE

pip
  autocompletado

screen
  automatic setting of window titles and status

sudo
  ESC twice: Puts sudo in front of the current command, or the last one if the command line is empty.

systemd
  Add sc-[command] aliases to all systemctl commands, using sudo when needed.

tig
  alias para tig: tis til tib

virtualenvwrapper
  activa las herramientas (mkvirtualenv, workon) y, si entramos en un directorio con un repo git, activa el virtualenv del mismo nombre

bgnotify
  nos muestra una notificación cuando un comando ha terminado y ha tardado más de 6" (útil para recordarnos que ha terminado algún comando que lleva tiempo)

go
  autocomplete y algunos aliases https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/golang/golang.plugin.zsh

emoji
  nos permite pintar caracteres emoji, https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/emoji

fasd
  https://github.com/clvv/fasd offers quick access to files and directories, inspired by autojump, z and v
