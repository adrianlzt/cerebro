https://www.cs.oberlin.edu/~kuperman/help/vim/indenting.html
:set tabstop=8     - tabs are at proper location
:set expandtab     - don't use actual tab character (ctrl-v)
:set shiftwidth=4  - indenting is 4 spaces
:set autoindent    - turns it on
:set smartindent   - does the right thing (mostly) in programs
:set cindent       - stricter rules for C programs

Ponerlo en el ~/.vimrc
:set tabstopr=8
:set expandtab
:set shiftwidth=4
:set autoindent
:set smartindent
:set cindent


https://github.com/Yggdroot/indentLine
lo he puesto para programar ansible en el vim  y q me muestre las lineas verticales de indentacion

A vim plugin to display the indention levels with thin vertical lines

Aparecen unas lineas verticales para aclararnos con la identacion en ficheros yaml


# Fix indent
gg=G
Desde el principio del fichero (gg), arreglar identación (=) hasta el final del fichero (G)
