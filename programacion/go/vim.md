https://github.com/fatih/vim-go

Plugins a utilizar:
deoplete.nvim
vim-go
deoplete-go


Comandos:
:Go<TAB>


Instalar dependencias de go:
:GoInstallBinaries


:GoDef
gd
Ir a la definición de la interfaz, funcion, struct, etc


:GoImpl
crear los stubs para implementar una interfaz

:GoImplements
nos dice que interfaces implementa ese elemento


Desactivar metalinter al guardar
:let g:go_metalinter_autosave=0
