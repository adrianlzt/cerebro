http://www.dayid.org/comp/tm.html
Tabla de comandos de screen VS tmux

Shortcuts
https://gist.github.com/andreyvit/2921703

Session: varias windows
Window: varios panes con distintos splits
Pane: cada ventana con una shell/app


Config:
~/.tmux.conf


# Shortcuts
Ver shortcuts:
C-b ?

Nueva ventana:
C-b c

Next/previous/last window
C-b n/p/l

Next/last pane
C-b o/;

Reload (bind r source-file ~/.tmux.conf \; display "Reloaded!")
C-b r

Detach
C-b d

Listar sessiones (nos da una previsualizacion de que hay en cada uno)
C-b s

Listar windows:
C-b w

Renombrar sesion
C-b $

Renombrar ventana
C-b ,

Matar ventana actual
C-b &

Mover panes:
https://gist.github.com/andreyvit/2921703


## Splits
Los splits son dentro de cada "ventana". Podemos tener un split horizontal en la ventana 1 y un split vertical en la ventana 2.

Split horizontal
C-b -

Split vertical
C-b |

Moverse entre los splits
C-b <arrows>

Scroll (también vale con el ratón)
C-b PageUp/PageDown


# Uso

Crear sesión con nombre
tmux new -s nombre

Ver sesiones
tmux ls

Attacharme a una tmux existente:
tmux a
tmux a -t nombre

Matar session
tmux kill-session -t nombre
