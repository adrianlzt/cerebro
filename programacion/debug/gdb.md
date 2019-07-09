http://darkdust.net/files/GDB%20Cheat%20Sheet.pdf
http://www.thegeekstuff.com/2010/03/debug-c-program-using-gdb/
http://beej.us/guide/bggdb/#qref
http://www.yolinux.com/TUTORIALS/GDB-Commands.html
http://linux.bytesex.org/gdb.html
https://youtu.be/PorfLSr3DDI 15' mostrando funcionalidades de gdb
https://blog.0x972.info/index.php
http://undo.io/resources/blog-articles/category/debugging/ posts con tips y guias sobre usos particulares de gdb
http://www.brendangregg.com/blog/2016-08-09/gdb-example-ncurses.html  ejemplo usando gdb para encontrar un problema con un programa en python

Como funciona gdb
https://blog.0x972.info/?d=2014/11/13/10/40/50-how-does-a-debugger-work


Mejor usar GEF + voltron (https://gef.readthedocs.io/en/latest/)
Hace la interfaz de gdb más amigable.
mirar gef.md
mirar plugins.md

$ cat ~/.gdbinit
source /home/adrian/.gdbinit-gef.py
source /usr/lib/python3.6/site-packages/voltron/entry.py


# Symbols
Para que gdb pueda matchear las líneas de ensamblador con el código en C tenemos que tener la info DWARF

Si el binario tiene info DWARF, cuando lo mostramos con "file" pondá "debug_info, not stripped" (en versiones viejas de "file" solo pondrá "not stripped")
Si compilamos con gcc, podemos pasar el parámetro "-g" para añadir la info DWARF.

Podemos ver el contenido DWARF con:
dwarfdump fichero

Con addr2line podemos sacar a que línea de código se mapea una instrucción del binario.
Ejemplo:
$ dwarfdump /usr/lib/debug/usr/bin/ls.debug | grep 402ce4
0x00402ce4  [1289, 0] NS
$ addr2line -e /usr/lib/debug/usr/bin/ls.debug  0x00402ce4
/usr/src/debug/coreutils-8.21/src/ls.c:1289



# CentOS/RedHat
Para instalar los simbolos de un binario
yum install -y yum-utils
debuginfo-install -y PKG


Para cosas mas especificas de ASM:
programacion/ensamblador/gdb.md

rr, ejecutamos una vez y luego con gdb miramos la ejecucción
rr.md



# Mini resumen (con GEF y voltron)
gcc -g program.c
tmux
gdb -q a.out
> tmux-setup
> r
> l
> b N (poner en alguna linea)
> r

Tenemos que terminar con dos panes de tmux, uno con la "shell" para pasar comandos y en el otro varias divisiones mostrando:
  registrosstack
  codigo en asm
  codigo en c
  threads
  trace

En otras ventanas podemos llamar a voltron para ver otros datos (mirar plugins.md)
Por ejemplo, para ver el stack (navegable): voltron view stack



Si no vemos el codigo, hacer un primer run "r" y luego veremos el codigo
Metemos un breakpoint en la primera linea de main y luego "r" de nuevo.


Si nos faltan los symbols en debian serán paquetes xxx-gdb
Tambien puede que nos falten los sources. En debian para glibc por ejemplo es glibc-source (en /usr/src/glibc tendremos que descomrpimir el .tar.xz)

Para cargar más directorios con sources (ficheros .c):
dir /path/



# GDB a un running proc
cat /proc/sys/kernel/yama/ptrace_scope
Si está a 1 o más es seguridad añadida, tal vez tengamos que bajarlo a 0: https://stackoverflow.com/questions/2308653/can-i-use-gdb-to-debug-a-running-process

gdb -p PID




Como hacer debug de programas con gdb.

1. Es necesario compilar el programa para que acepte debug:
  gcc -g programa.c -o programa

2. Arrancar el gdb con el programa
  gdb programa

  Si no encuentra las fuentes: gdb --directory=fuentes/ ...

Si queremos interrumpir el programa mientras está ejecutándose haremos Control+C

Si queremos ejecutar un programa con parámetros:
  gdb programa
  gdb> run -h -b 3 -r

  Otra forma
  $ gdb --args programa --arg1 --arg2

Debug stripped binaries:
http://reverseengineering.stackexchange.com/questions/1935/how-to-handle-stripped-binaries-with-gdb-no-source-no-symbols-and-gdb-only-sho
Tras cargar el binario:
gdb> info file
Copiamos el Entry Point (primera linea)
gdb> break *0xXXXX (el entrypoint)
gdb> set disassembly-flavor intel  (sintaxis INTEL, primer argumento lo que recibe, y el segundo lo que pasa)
gdb> layout asm


Comandos:

TUI https://sourceware.org/gdb/onlinedocs/gdb/TUI.html
http://www.delorie.com/gnu/docs/gdb/gdb_197.html
win: divide la pantalla, mostrando arriba el código y la línea procesada, y abajo para meter órdenes!! Es la interfaz ncurses TUI. Puede que se muestre mal con screen
  layout prev/next: distintos layouts: ensamblador, valores de registros, codigo, y combinaciones de estos.
  focus next/prev: focus en las distintas ventas para poder hacer scroll
  refresh: refresh the screen
  update: Update the source window and the current execution point. 
  https://sourceware.org/gdb/onlinedocs/gdb/TUI-Commands.html
  control+l repain screen (por si se ha estropeado el output con algun print o similar)

  control+x 1: modo con código arriba y gdb abajo
  control+x 2: modo con código arriba, ensamblador en medio y gdb abajo

  control+p: previous command (la flecha de arriba es para navegar por el codigo)
  control+n: next command

  Para salir:
    C-x C-a
    C-x a
    C-x A

r: run
c: continue
l: listar el codigo. "show listsize" para ver cuantas lineas mostrar. "set listsize N" para modificarlo
b <cosa,linea,...> : break point
n: next (no entra en funciones)
  n <num>: ejecuta num lineas
s: step (si entra en funciones)
  s <num>: ejecuta num lineas
return: sale prematuramente de una funcion
  return expr: sale prematuramente de una funcion devolviendo expr
fin,finish: ejecuta hasta el final de la función, y para justo despues
ni: next assembler (no entra en funciones)
si: step assembler (si entra en funciones)
where: donde estamos
info registers: muestra los registros
call -- Call a function in the program
output -- Like "print" but don't put in value history and don't print newline
p,print -- Print value of expression EXP
  p/a 0x7ffff3e8f948  imprime el valor con formato address
printf -- Printf "printf format string"
explore -- valor y más info sobre una variable
show args: muestra los parametros con los que hemos ejecutado el programa
show environment: muestra las variables de entorno
whatis: información sobre el tipo de una variable
set var variable=34, definir el valor de una variable
j,jump <linea>: continua la ejecución en esa linea
watch variable: para la ejecucción cuando se modifique esa variable


# Breakpoints
Podemos poner breakpoints en ficheros que aun no han sido cargados:
(gdb) b build/build.c:299
No source file named build/build.c.
Make breakpoint pending on future shared library load? (y or [n]) y
Breakpoint 1 (build/build.c:299) pending.

Ejecutar acciones cuando salte un breakpoint:
command NUMBP
cosas que queremos hacer
end

i b
info breakpoints,
  mostrar info de los breakpoints

delete NUM
  borrar un breakpoint por su numero

clear func
clear lineno
clear file:lineno
  http://www.delorie.com/gnu/docs/gdb/gdb_32.html
  borrar breakpoints por donde estan




# Python
https://sourceware.org/gdb/current/onlinedocs/gdb/Python.html#Python
A partir de la version 7 de gdb

API Python
https://developers.redhat.com/blog/2017/11/10/gdb-python-api/
explicando el por que de una api python y algunos ejemplos (aunque los ejemplos no son muy buenos, según comenta uno)


(gdb) python print("hola")
hola

(gdb) python
>a=3
>print("a vale %d", a)  # Control+d
>a vale %d 3
(gdb) 

Podemos escribir py en vez de python

Si queremos python interactivo:
(gdb) pi
>>> 2+3
5


También podemos definir funciones y luego llamarlas con python funcion()

Mostrar errores completos de python
set python print-stack full

Importar ficheros:
source fichero.py

Ayuda
python help (gdb)

## Interactuar con GDB desde python
https://sourceware.org/gdb/current/onlinedocs/gdb/Python-API.html#Python-API

(gdb) python gdb.execute("list")


Consultar los breakpoints
(gdb)
$ pi
>>> gdb.breakpoints()
(<gdb.Breakpoint object at 0x7f231a17b0f8>, <gdb.Breakpoint object at 0x7f231a17b080>)

Crear un breakpoint
$ pi
>>> gdb.Breakpoint('8')
Breakpoint 2 at 0x400573: file helloworld.c, line 8.
<gdb.Breakpoint object at 0x7f7085eb1300>
>>> 


## Comandos de gdb escritos en python
En /usr/share/gdb/python/gdb/command econtraremos comandos de gdb escritos en python

explore VARIABLE
  nos dice que tipo es y su valor

https://sourceware.org/gdb/current/onlinedocs/gdb/Pretty-Printing.html#Pretty-Printing
pretty-printing nos permite que al hacer print nos saque la informacion mostrada correctamente

## Funciones de gdb escritas en python
En /usr/share/gdb/python/gdb/function encontraremos helpers escritos en python que se pueden usar desde gdb:

Funciones:
$_memeq(a, b, len)
$_strlen(a)
$_streq(a, b)
$_regex(string, regex)
$_caller_is(name [, number_of_frames])
$_caller_matches(regex [, number_of_frames])
$_any_caller_is(name [, number_of_frames])
$_any_caller_matches(regex [, number_of_frames])



Ejemplo:

(gdb) p $_strlen("foofoo")
$4 = 6

(gdb) p $_streq("fee", "foo")
$1 = 0
(gdb) p $_streq("foo", "foo")
$2 = 1


# Prompt
https://gist.github.com/adrianlzt/ab4e5f3609c1decb33995d839b0de39d
https://sourceware.org/gdb/onlinedocs/gdb/Prompt.html
https://blog.0x972.info/?d=2014/12/04/09/25/38-dev-tools-configuration-gdbs-gdbinit
https://gitorious.org/misc-gdb-stuff/misc-gdb-stuff/ ejemplo complicado, no termina de funcionarme
https://github.com/dholm/dotgdb  GDB scripts to add support for low level debugging and reverse engineering


# Reverse debugging
La idea es parar en un breakpoint, ejecutar el comando 'record' y continuar hasta un fallo.
Una vez en el fallo, el reverse debugging nos permitirá ir hacia atrás, viendo como se han ido ejecutando las funciones hasta que ha fallado.

http://www.brendangregg.com/blog/2016-08-09/gdb-example-ncurses.html
Paso 10

# Forks
set follow-fork-mode parent/child
 en caso de fork, a quien seguir
