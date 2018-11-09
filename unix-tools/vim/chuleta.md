http://vim.wikia.com/

Start searching with spacebar
F2 -> Save file
F3 -> Toggle line numbers
F4 -> Open unite with file and buffer
F5 -> Compile/build
F6 -> Show build errors
F7 -> Previous error
F8 -> Next error
F9 -> Cambia a paste mode
F10 -> Hide/Show Gitgutter
F12 -> Save all and exit

ZZ o __ guardar y salir


H, L, mover entre buffers
que son los buffers?


J,K mueve arriba el bloque visual seleccionado

TAB autocompletar, con Omni Completion

Folding, no funciona en python?
Shortcuts para manejar los pliegues: , - _

Plugin airline?

Plug 'aperezdc/vim-template'  " Set of templates for certain file types
Plug 'bling/vim-airline'      " Superpowers for status/tabline
Plug 'airblade/vim-gitgutter' " Shows a git diff in the gutter (sign column)
Plug 'tpope/vim-fugitive'     " The best git wrapper of all time
Plug 'Shougo/unite.vim'       " Search and display information from arbitrary sources
Plug 'godlygeek/tabular'      " Text filtering and alignment

Plug 'bkad/CamelCaseMotion'   " Provide CamelCase motion through words
Es lo que hace que mover al principio de la linea no vaya como espero?
Desactivado por ahora los bindins a E,W,B


Matematicas
En insert mode
Control+r =
Ponemos una fórmula y vim pone el resultado donde estabamos


" FZF
,fl " Buscar una linea en todos los buffers abiertos
,fb " Solo en el buffer current
,fg " Buscar con rg y con fzf sobre los resultados
