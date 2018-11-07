http://vimawesome.com/

Lista de un programador
https://github.com/joshdmiller/vim/blob/master/vim/lib/plugins.vim


# Plug
https://github.com/junegunn/vim-plug
Meter el user/repo de github en el .vimrc
Arrancar vim y poner
:PlugInstall

Actualizar plug
:PlugUpgrade

Actualizar plugins
:PlugUpdate



# Vundle
Gestionar con Vundle (mirar vundle.md)

Poner las extensiones en bundle, y automáticamente funcionan:
cd ~/.vim/bundle
git clone git://github.com/tpope/vim-sensible.gi




# Plugins útiles
NertTree
https://github.com/scrooloose/nerdtree
,nn -> abrir ventana de archivos



Syntastic
https://github.com/scrooloose/syntastic
Se ejecuta tras guardar :w
:SyntasticCheck para forzar el análisis




FZF
https://github.com/junegunn/fzf/blob/master/README-VIM.md
:FZF
:FZF /some/path
  abrir ficheros eligiendolos usando fzf.
  enter -> abrir en el current buffer
  C-t nuevo tab
  C-x split horizontal
  C-v split vertical

https://github.com/junegunn/fzf.vim
Usar fzf para buscar: ficheros, lineas, buffers, snippets, etc
