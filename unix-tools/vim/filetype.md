Se muestra en la esquina inferior derecha


Obtener el filetype actual:
:set filetype?
:se ft?

:set ft=cpp
:set ft=cpp.cuda
  esto es que tenemos los dos filetypes


Forzar un filetype en un fichero.
Poner esto al comienzo:
# vim:ft=ansible:


Recargar ft
:w
:e
