https://github.com/junegunn/fzf

Busqueda "fuzzy" por listas

# Install Arch
yay fzf


# Config


# Uso
vi $(fzf)
  antes de abrir vim nos muestra una lista de ficheros del pwd para seleccionar

vi $(fzf -m)
  para seleccionar varios ficheros (con tab)


Usando tmux, abre un split donde seleccionamos lo que necesitamos
vi $(fzf-tmux)


Meter como plugin de oh-my-zsh

Autocompleta:
ssh **
export **
kill
vim **
vim xx**
  fichero en pwd (que hagan match a 'xx')


Para mostrar el contenido en el mismo orden que nos lo hayan pasado:
--tac --no-sort


Para mostrar una ventana de preview, típicamente con el contenido del fichero seleccionado:
fzf --preview='head -$LINES {}'
