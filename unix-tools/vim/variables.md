https://codeyarns.com/2010/11/26/how-to-view-variables-in-vim/


g:  global variables
b:  local buffer variables
w:  local window variables
t:  local tab page variables
s:  script-local variables
l:  local function variables
v:  Vim variables.

Mostrar:
:let

:let g
  solo las globales
:let g:cmds
  valor de una variable en concreto


Copiar al buffer "a" la salida de let. Y luego pegar el buffer
:redir @a
:let
:redir END
"ap
