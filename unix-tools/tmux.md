http://www.dayid.org/comp/tm.html
Tabla de comandos de screen VS tmux
La tecla "mágica" por defecto es C-b, pero generalmente se pone a C-a


Session: varias windows
Window: varios panes con distintos splits
Pane: cada ventana con una shell/app


# tmuxinator
https://github.com/tmuxinator/tmuxinator
Generar configuraciones de sesiones para tmux


Config:
~/.tmux.conf


# Shortcuts
Ver shortcuts:
C-b ?
tmux list-keys

Nueva ventana:
C-b c

Next/previous/last window
C-b n/p/l

Next/last pane
C-b o/;

Mostrar un numero y cada pane y luego movernos al seleccionado
C-b q

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

Marcar/desmarcar pane (para usar con join-pane, swap-pane, swap-window):
C-b m
C-b M


Mover panes:
https://gist.github.com/andreyvit/2921703

Mover un pane a una nueva window
C-b !

Mover un pane a otra window
Vamos al pane que queremos mover y lo marcamos: C-b m
Vamos a la ventana donde queremos colocarlo y: C-b :joinp


## Splits
Los splits son dentro de cada "ventana". Podemos tener un split horizontal en la ventana 1 y un split vertical en la ventana 2.

Split horizontal
C-b -
C-b "  # el estandar

Split vertical
C-b |
C-b %  # el estandar

Moverse entre los splits
C-b <arrows>

Scroll (también vale con el ratón)
C-b PageUp/PageDown

Cerrar un split (matar uno de los panes)
C-b x

Mostrar un pane a pantalla completa temporalmente (mismo comando para volver a mostrar todos)
C-b z

Mover un split hacia delante o atras
C-b {
C-b }

Rotar por distintas organizaciones de ventanas
C-b space



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


# Log
Se puede arrancar con -v
O hacer toggle con:
kill -s SIGUSR2 14679



# Raton
Para copiar texto seleccionar con el ratón mientras presionamos Shift.
Para pegar, presionar Shift más el botón del medio del ratón.

# Copiar (hay dos modos, emacs o vi, con list-keys podemos ver las teclas para cada modo. Creo que se cambia con "setw -g mode-keys vi")
En modo emacs:
C-b [
movernos hasta el inicio de la seleccion
C-space
movernos hasta el final de la selección
C-w

## Copia en columa
Antes de C-space pulsar R


# Sincronizar
C-b :setw synchronize-panes
  escribir lo mismo en todos los panes de un window (se puede usar tab para autocompletar)
  C-b e, activar
  C-b E, desactivar




# Plugins

## Copycat
https://github.com/tmux-plugins/tmux-copycat
n: next
N: previous (hacia abajo)
C-w: seleccionar (emacs mode)
Enter: seleccionar (vi mode)
C-b ]: copiar en el portapapeles

Si tenemos tmux-yank:
y: copiar al portapapeles
Y: copiar y pegar en la command line


C-b C-f: buscar path
C-b C-g: git status files
C-b A-h: sha1 hashes (git log, docker ps, docker ps)
C-b C-u: URLs
C-b C-d: numbers/digits
C-b A-i: ip address


## Resurrect + continuum
https://github.com/tmux-plugins/tmux-resurrect
https://github.com/tmux-plugins/tmux-continuum
Esta configurado para autosave cada 15 minutos

A mano
prefix + Ctrl-s - save
prefix + Ctrl-r - restore

