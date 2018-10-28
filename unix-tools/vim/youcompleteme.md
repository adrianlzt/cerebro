deoplete

Posible alternativa a deoplete? https://github.com/ncm2/ncm2

https://github.com/Valloric/YouCompleteMe
https://wiki.archlinux.org/index.php/YouCompleteMe

# Install con plug
Plug 'Valloric/YouCompleteMe' " Autocompletado

Abrir vim y poner
:PlugInstall


Luego:
cd ~/.vim/bundle/YouCompleteMe
./install.py --all

Mirar en https://github.com/Valloric/YouCompleteMe#ubuntu-linux-x64 para ver que opciones podemos poner en vez de all

# Javascript
Hace uso de tern.
Mirar en programacion/javascript/tern.md


# Autocompletado
Nos muestra opciones de autocompletado automaticamente.
Con tab podemos seleccionar las distintas opciones.

Si escribimos parte de una variable tambien nos aparecerá el autocompletado de esa variable.

# Ficheros
Si ponemos "./" nos dejaseleccionar un fichero del dir actual
Tambien podemos usar "/" para buscacr un fichero a partir del path root


# Ventana de ayuda
Si queremos cerrar la ventana de arriba donde se muestra la ayuda
C^k
:q
