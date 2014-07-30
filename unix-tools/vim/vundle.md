https://github.com/gmarik/Vundle.vim

Vundle, the plug-in manager for Vim 

Vundle is short for Vim bundle and is a Vim plugin manager.

Vundle allows you to...
  keep track of and configure your plugins right in the .vimrc
  install configured plugins (a.k.a. scripts/bundle)
  update configured plugins
  search by name all available Vim scripts
  clean unused plugins up
  run the above actions in a single keypress with interactive mode

Vundle automatically...
  manages the runtime path of your installed scripts
  regenerates help tags after installing and updating

Vundle is undergoing an interface change, please stay up to date to get latest changes.


## Instalación ##
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim

Meter en .vimrc la configuración.


## Plugins ##
Meter en .vimrc con el formato:
Plugin 'vim-ruby/vim-ruby'

Luego ejecutar:
vim +BundleInstall


## Comandos ##
:PluginList          - list configured plugins
:PluginInstall(!)    - install (update) plugins
:PluginSearch(!) foo - search (or refresh cache first) for foo
:PluginClean(!)      - confirm (or auto-approve) removal of unused plugins
