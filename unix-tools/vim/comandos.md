control+a		aumenta el número que primero encuentre en la linea
control+x		disminuye el numero primero encuentre en la linea


En todas las lineas, busca una linea que solo tenga el caracter r, y borrala ('d').
g/ es para get. Coge las lineas de este match y haz tal cosa
%g/^r$/d

Cambia la letra a por un cambio de línea:
%s/a/\r/g

Inserta un cambio de línea antes de '(', ',' o ')'
/[(,)]
:s//\r&/g
  Primero se realiza la búsqueda.
  Luego se aplica la substitución a lo encontrado por la búsqueda.
  Se pone un cambio de línea (\r) y luego el resultado de la búsqueda (&)
  Se hace todas las veces que haga falta por línea (\g)


:%s/XXX/ABC/g
Cambia en todo el fichero las apariciones de XXX por ABC (incluso si hay varias en una línea)

Quitar “Control+M” de los finales de línea (^M):
:%s/^V^M//g
El ^V, es pulsar control+v, entonces nos aparecerá el caracter ^, y tendremos que escribir control+m

:Sex  Abre una nueva ventana horizontal con un navegador de ficheros

Control+w [up,down] moverse entre ventanas

ddp -> borra una linea, nos movemos, pulsamos p, y la pegamos


Comentar muchas líneas:
Control+V
Selecciono las líneas (hjkl)
I (i mayúsucla)
Escribo #
Esc Esc

Corrección ortográfica (mapeado a F4):
:setlocal spell spelllang=es_es
zg: añadir palabra bajo el cursor al diccionario
[s y ]s: mover al siguiente/anterior error
z= : mostrar sugerencias para la palabra bajo el cursor

Pegar código mientras el autoindent está encendido:
:set paste
pegar código
:set nopaste


Abre los tres ficheros spliteando en distintas ventanas automaticamente
vim -o file1 file2 file3

Abre varios ficheros (mejor usar buffers)
vim file1 file2 file3
:n siguiente fichero
:prev anterior fichero
:args ficheros abiertos




:cd <path>
cambia de directorio (tiene autorelleno)

:pwd
Muestra el actual directorio

:bd
close current buffer

:%s/blabla/tete/g
Cambia en todo el fichero, todas las ocurrencias de blabla por tete

:.,+2s/blabla/tete/g
Cambia en esta línea y las dos siguientes...

:.,$s/bla/tete/
Cambia desde esta línea hasta el final del fichero [ranges]

:set number
Muestra números de línea

:set number!
Oculta los números de línea

:wa
Save all buffers

:xa
Save all buffers and exit

:qa
Quit all

:q
Command window

qm
Grabar pulsaciones de teclas a buffer ‘m’ (en modo normal)

q
Fin grabar pulsaciones de teclas

@m
Repetir las pulsaciones de teclas del buffer ‘m’

:e fichero
Empezar a editar un nuevo fichero

%
Saltar entre paréntesis, fin/comienzo comentarios etc. link

gd
goto definition (ir a la definicion de una variable)

g*
ir a donde aparezca la palabra que tenemos bajo el cursor

gU<movimiento>
Convertir a mayusculas. Ej.: gUe

gu<movimiento>
Convertir a minusculas

g~<movimiento>
toggle case

Control+RePag 
toggle case
  nos cambia como cuatro o cinco letras a cada golpe (hacia la derecha)

modo visual + u/U/~
Convertir a minúsculas, mayúsculas o toggle

Y
copy actual line

10Y
copy 10 following lines

yG
All lines till end of file

p
pegar debajo/delante del cursor

P
pegar encima/detrás del cursor

K
hace man de la palabra que tengmos en el cursor

!comando
Ejecuta el comando externo (execute external command)


Linea delimitando la columna 80 (esta limitación viene de poder imprimir el código en papel)
:set colorcolumn=80


ZZ
Guardar y salir
