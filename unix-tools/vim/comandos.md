http://vim.wikia.com/wiki/Search_and_replace

control+a  aumenta el número que primero encuentre en la linea
control+x  disminuye el numero primero encuentre en la linea

Borra lineas entre 25 y 30 (incluídas)
:25,30d

Borrar lineas con un pattern
http://vim.wikia.com/wiki/Delete_all_lines_containing_a_pattern
:g/profile/d

Borrar lineas que hacen match de ese pattern y almacenarnlas en el registro "a" (al ponerlo en mayúsculas hace append).
:g/PATTERN/d A

Borrar el registro:
:let @a=""
qaq


Borrar newline al final de linea:
:%s/\n/

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
  C-<j,k> para moverse entre ellos
  :qa cierra todos
  :xa guarda y cierra todo


Abre varios ficheros (mejor usar buffers)
vim file1 file2 file3
:n siguiente fichero
:prev anterior fichero
:args ficheros abiertos


:set number
Muestra números de línea

:set number!
Oculta los números de línea

:cd <path>
cambia de directorio (tiene autorelleno)

:pwd
Muestra el actual directorio


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
control+t saltar a donde estábamos antes


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

r!comando
ejecuta el comando e inserta en el documento el output

Si queremos pasar un contenido del fichero a un comando externo y luego sustituir lo seleccionado con ese output:
control+v, seleccionar líneas y luego
: ! comando
  lo veremos como  :'<,'> ! sort   vim estará poniendo el ":'<,'> " para indicar que se actua sobre líneas seleccionadas

:set filetype?
:se ft
Nos dice que filetype tiene definido actualmente

:verbose set PARAMETRO
Nos dice el último sitio donde se definió este parámetro.


Linea delimitando la columna 80 (esta limitación viene de poder imprimir el código en papel)
:set colorcolumn=80
:set colorcolumn=   <- borrar la columna

ZZ
Guardar y salir

% va al otro paréntesis, corchete, ...

$ va al fin de linea

0 va al comienzo de linea

gg comienzo del fichero

G final del fichero

@: repetir último comando escrito con ":"


Volver a la ultima posicion
''


q:
  abrir la lista de los ultimos comandos. Nos permite modificarlos y ejecutarlos



  Pasar una selección visual por un comando externo
  Control+v para tener la selección visual, y luego (lo de <> lo pone solo)
  :'<,'>!jq
