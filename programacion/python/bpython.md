http://bpython-interpreter.org/screenshots.html

bpython is a fancy interface to the Python interpreter for Linux, BSD, OS X and Windows (with some work). 

Tiene un autocompletado muy bueno.
Sustituye al interprete de python

# Arch
pacman -S bpython2
pacman -S bpython


Mejor usar
bpython-curses
bpython2-curses

Otra opcion es ipython
Mejor Jupyter
sudo pacman -S jupyter


Para virtualevns hará falta instalarlo dentro del venv

# Combinaciones de teclas
https://docs.bpython-interpreter.org/en/latest/configuration.html#keyboard

Para editar la sesión entera en un fichero
Al guardar, se limpia y reevalua
F7

Saves the current session to a file (prompts for filename)
C-s

Para entrar en vim desde dentro de bpython
Control+x

incremental_search
M-s

Shows the source of the currently being completed (python) function.
F2

Editar config de bpython
F3
