Vim reescrito para poder seguir avanzando en el desarrollo.

# Install
pacman -S neovim python-neovim

# Configuración
Para utilizar nuestra conf actual de vim

mkdir -p ~/.config/nvim
cp ~/.vimrc ~/.config/nvim/init.vim
  mejor tener los ficheros separados, o si no, usar un truco como este para que los rootpath sean distintos: https://arusahni.net/blog/2015/04/switching-to-neovim-part-2.html

Si usamos Plug para los plugins, tras arrancar tendremos que poner :PlugInstall


Me da un problema porque ~/.viminfo no es el tipo de fichero que espera.
Parece que han cambiado el formato de este fichero.
Es donde vim almacena el histórico de comandos, posiciones de ficheros, etc


# Plugins
Syntax checker (en vez de syntastic): https://github.com/benekastah/neomake (para JS usar con https://github.com/mantoni/eslint_d.js)
Autocompletado (en vez de YouCompleteMe): https://github.com/Shougo/deoplete.nvim
 para JS: https://github.com/carlitux/deoplete-ternjs/
 para Go: vim-go (tras meterlo con plug, abrir nvim y ejecutar :GoInstallBinaries)

Mirar
https://github.com/majutsushi/tagbar

## Python
Si necesitamos soporte para python
https://github.com/neovim/neovim/issues/1315



# Debug
Si queremos comprobar que todo va bien, ejecutar el comando
:CheckHealth


# Errores

La tecla esc tiene lag en tmux o screen: https://github.com/neovim/neovim/wiki/FAQ#esc-in-tmux-or-gnu-screen-is-delayed
Poner en .screenrc maptimeout 10
