# Tab to spaces
http://vim.wikia.com/wiki/Converting_tabs_to_spaces

:retab


:set list
mostrar tabs como ">"


Tamaño en espacios en blanco de un tab
:set tabstop=4

Borrar los errores por tener tabs (cosa mia, para evitarlos)
:syntax clear Error
Tengo puesto:
autocmd BufNewFile,BufRead * syntax match Error /\t/




# Poder usar tabs
En mi config tengo puesto que los tabs son espacios en blanco.

Para que el boton tab ponga tabs:
:set expandtab!
