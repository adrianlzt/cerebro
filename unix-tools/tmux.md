http://www.dayid.org/comp/tm.html
Tabla de comandos de screen VS tmux
La tecla "mágica" por defecto es C-b, pero generalmente se pone a C-a


Session: varias windows
Window: varios panes con distintos splits
Pane: cada ventana con una shell/app


Compartir una session:
tmux attach-session -t NAME

# tmuxinator
https://github.com/tmuxinator/tmuxinator
Generar configuraciones de sesiones para tmux


Config:
~/.tmux.conf


# Opciones
https://www.packtpub.com/mapt/book/hardware_and_creative/9781783985166/2/ch02lvl1sec23/show-options
Globales:
tmux show-options -g
C-b : show-options g

tmux window-show-options -g
estas opciones son diferentes que las de "show-options -g"

De ventana
tmux show-options -w

Server:
tmux show-options -s



# Mode
Tiene dos modos: emacs o vim

Listas de shortcuts para emacs o vim
https://superuser.com/a/197272/526882

C-b : list-keys -T copy-mode
C-b : list-keys -T copy-mode-vi

Function                vi             emacs
Back to indentation     ^              M-m
Clear selection         Escape         C-g
Copy selection          Enter          M-w
Cursor down             j              Down
Cursor left             h              Left
Cursor right            l              Right
Cursor to bottom line   L
Cursor to middle line   M              M-r
Cursor to top line      H              M-R
Cursor up               k              Up
Delete entire line      d              C-u
Delete to end of line   D              C-k
End of line             $              C-e
Goto line               :              g
Half page down          C-d            M-Down
Half page up            C-u            M-Up
Next page               C-f            Page down
Next word               w              M-f
Paste buffer            p              C-y
Previous page           C-b            Page up
Previous word           b              M-b
Quit mode               q              Escape
Scroll down             C-Down or J    C-Down
Scroll up               C-Up or K      C-Up
Search again            n              n
Search backward         ?              C-r
Search forward          /              C-s
Start of line           0              C-a
Start selection         Space          C-Space
Transpose chars                        C-t


Ver en que modo estamos:
tmux show-options -g | grep status-key

Cambiar modo:
set-option -g status-keys emacs
set-option -g mode-keys emacs



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

Reload (bind R source-file ~/.tmux.conf \; display "Reloaded!")
C-b R

Dettach
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

Lock:
C-b :lock-session
  lo mismo para desbloquear


Mover panes:
https://gist.github.com/andreyvit/2921703

Mover panes dentro de una window
C-b {
C-b }

Mover un pane a una nueva window
C-b !

Mover un pane a otra window
Vamos al pane que queremos mover y lo marcamos: C-b m
Vamos a la ventana donde queremos colocarlo y: C-b :joinp

Mover una window a otra sesión. Estando en la window a mover:
move-window -t other_session:

O para traernos una ventana de otra sesión:
movew -d sesion:ventana



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

Unirte a la sesión "notas" o crearla si no existe (y unirte):
tmux new-session -A -s notas

Matar session
tmux kill-session -t nombre


# Log
Se puede arrancar con -v
O hacer toggle con:
kill -s SIGUSR2 14679



# Raton
Para copiar texto seleccionar con el ratón mientras presionamos Shift.
Para pegar, presionar Shift más el botón del medio del ratón.


# Buscar
Ponernos en modo copy y pulsar "/"


# Copiar (hay dos modos, emacs o vi, con list-keys podemos ver las teclas para cada modo. Creo que se cambia con "setw -g mode-keys vi")
Para saltar al "copy mode":
C-b [

emacs:
movernos hasta el inicio de la seleccion y para comenzar a seleccionar pulsar:
C-space
Para terminar la selección:
C-w

En modo vim:
para empezar
space
Para terminar
enter

Para movernos por las palabras, como vim (w, e, hjkl, etc)

Pegar con C-b ]

## Copia en columa
Antes de C-space pulsar R


# Sincronizar / retransmitir a múltiples
bind-key e set-window-option synchronize-panes\; display-message "synchronize-panes is now #{?pane_synchronized,on,off}"
  C-b e, activar/desactivar
Si queremos sincronizar un pane, podemos desactivarlo: selectp -d (para activarlo de nuevo selectp -e)
No hay opción de hacer esto más user-friendly: https://github.com/tmux/tmux/issues/1638




# Plugins

## TMUX plugin manager: tpm
prefix + I
    Installs new plugins from GitHub or any other git repository
    Refreshes TMUX environment

prefix + U
    updates plugin(s)

prefix + alt + u
    remove/uninstall plugins not on the plugin list


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
https://github.com/tmux-plugins/tmux-resurrect/blob/master/docs/restoring_pane_contents.md
  restaurar el contenido de cada pane

A mano
prefix + Ctrl-s - save
prefix + Ctrl-r - restore


## Rofi
https://rofi-tmux.readthedocs.io/en/latest/usage.html
Moverse por sesiones o windows con rofi
