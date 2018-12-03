http://vim.wikia.com/wiki/Buffers

:e fichero
 abre un nuevo buffer

H,L movernos al buffer izquierda o derecha

:ls
  listar buffers

:bd
  cerrar buffer (falla si no esta guardado, :bd! para forzar salida)

:new
  nuevo buffer


:bd
close current buffer

:wa
Save all buffers

:xa
Save all buffers and exit



# Buffers donde copiar cosas
Copiar al buffer "a" la salida de let. Y luego pegar el buffer
:redir @a
:let
:redir END
"ap


Copiar la linea al buffer "a"
"ayy

