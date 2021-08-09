http://darkdust.net/files/GDB%20Cheat%20Sheet.pdf
http://www.thegeekstuff.com/2010/03/debug-c-program-using-gdb/
http://beej.us/guide/bggdb/#qref
http://www.yolinux.com/TUTORIALS/GDB-Commands.html
http://linux.bytesex.org/gdb.html
https://youtu.be/PorfLSr3DDI 15' mostrando funcionalidades de gdb
https://blog.0x972.info/index.php
http://undo.io/resources/blog-articles/category/debugging/ posts con tips y guias sobre usos particulares de gdb
http://www.brendangregg.com/blog/2016-08-09/gdb-example-ncurses.html  ejemplo usando gdb para encontrar un problema con un programa en python
https://www.highgo.ca/2021/07/09/using-gdb-to-trace-into-a-parallel-worker-spawned-by-postmaster-during-a-large-query/
  ejemplo debugeando postgres

Tal vez es mejor idea usar rr
Permite grabar una sesión y reproducirla varias veces


Como funciona gdb
https://blog.0x972.info/?d=2014/11/13/10/40/50-how-does-a-debugger-work


Mejor usar GEF + voltron (https://gef.readthedocs.io/en/latest/)
Hace la interfaz de gdb más amigable.
mirar gef.md
mirar plugins.md

$ cat ~/.gdbinit
source /home/adrian/.gdbinit-gef.py
source /usr/lib/python3.7/site-packages/voltron/entry.py (deprecated?)


# Symbols / dwarf / strip
Para que gdb pueda matchear las líneas de ensamblador con el código en C tenemos que tener la info DWARF

Si el binario tiene info DWARF, cuando lo mostramos con "file" pondá "debug_info, not stripped" (en versiones viejas de "file" solo pondrá "not stripped")
Si compilamos con gcc, podemos pasar el parámetro "-g" para añadir la info DWARF.

Por lo que veo, ciertos binarios stripped parece que conservan info de las funciones. gdb "bt" me muestra los nombres de las funciones asociados a las direc de memoria.

Con el comando nm también podemos comprobar si el binario tiene los símbolos.
nm binario
Si no tiene símbolos fallará con "no symbols"

Podemos quitar los símbolos a un binario con:
strip -s -o a.out.stripped a.out

Generar solo un fichero con la info debug (DWARF):
strip --only-keep-debug -o a.out.debug a.out
objcopy --only-keep-debug a.out a.out.debug
  equivalente

Quitar solo los símbolos de debug:
strip --strip-debug -o a.out.no_dbg_sym a.out

Por lo que veo haciendo pruebas:
  un binario compilado normal tiene symbols pero no debug info (nm funciona, pero dwarfdump devuelve las secciones vacías). GDB nos dice que no tiene debugging symbols
    podremos debugear porque tenemos los symbols, es decir, podemos hacer "b main", pero no podremos ver el código al que corresponde
  un binario compilado con -g tiene debugging symbols, muestra info con dwarfdump y es debuggeable completamente con gcc (muestra código fuente)
    necesitamos tener los ficheros de código fuente accesibles
  un binario stripped, nm devuelve vacío. gdb no permite hacer "b main".

Podemos ver el contenido DWARF con (yum install libdwarf-tools):
dwarfdump fichero
  aqui veremos los mapeos de las direcciones de memoria a los ficheros del código fuente (que tendremos que tener localmente)
  ejemplo: 0x00407db6  [ 989, 0] NS uri: "/usr/src/debug/zabbix-3.2.6/src/zabbix_sender/zabbix_sender.c"


Con addr2line podemos sacar a que línea de código se mapea una instrucción del binario.
Ejemplo:
$ dwarfdump /usr/lib/debug/usr/bin/ls.debug | grep 402ce4
0x00402ce4  [1289, 0] NS
  En la sección .debug_line es donde se hace el mapeo de posiciones de memoria a lineas del código fuente. Ejemplo:
    <pc>        [lno,col] NS BB ET PE EB IS= DI= uri: "filepath"
    0x00001149  [   6, 1] NS uri: "/var/tmp/tmp.xmplvj5BtO/helloworld.c"
    0x00001158  [   8, 9] NS
    0x0000115f  [   8, 2] NS

$ addr2line -e /usr/lib/debug/usr/bin/ls.debug  0x00402ce4
/usr/src/debug/coreutils-8.21/src/ls.c:1289

Si tenemos un programa corriendo, para una posición determinada de memoria de la instrucción, restamos la posición inicial de memoria (cat /proc/9938/smaps | head -1 | cut -d '-' -f 1) y nos da la dirección que debemos pasar a addr2line para obtener la línea del código que queremos ver.

Depende del tipo de binario el programa se cargará en la dirección base o en una random (leer más abajo):
          Start Addr           End Addr       Size     Offset objfile
            0x400000           0x594000   0x194000        0x0 /usr/sbin/zabbix_server_pgsql.debug_info
            0x794000           0x795000     0x1000   0x194000 /usr/sbin/zabbix_server_pgsql.debug_info

          Start Addr           End Addr       Size     Offset objfile
      0x5593a6b70000     0x5593a6d23000   0x1b3000        0x0 /usr/sbin/zabbix_server_pgsql.stripped
      0x5593a6f22000     0x5593a6f80000    0x5e000   0x1b2000 /usr/sbin/zabbix_server_pgsql.stripped

Esto de que mapee las direciones de memoria de una manera u otra depende de si el binario es PIE (Position Independent Executable).
Estos binarios PIE (en versiones nuevas de file lo pone como "LSB pie executable", en atiguas "LSB shared object") permite al dynamic loader cargar el binario en posiciones random
https://unix.stackexchange.com/questions/472449/what-is-the-difference-between-lsb-executable-et-exec-and-lsb-shared-object
Por el contrario, los "LSB executable" se cargarán en la dirección base de memoria.


Parece que para los binarios PIE cargados con ASLR, no podemos cargarle su tabla de symbols.
Creo que PIE y ASLR son cosas distintas, aunque actuen de forma similar.



Si modificamos el fichero del código fuente, el mapeo será incorrecto. GDB espera que el fichero está tal y como se compiló.

Las instrucciones "directory" y "set substitute-path" valen para definir donde debe buscar las fuentes del código.
Ejemplo:
directory  /usr/src/debug/zabbix-3.2.6/src/zabbix_server/
set substitute-path /home/makerpm/rpmbuild/BUILD/zabbix-3.2.6 /usr/src/debug/zabbix-3.2.6/


https://sourceware.org/gdb/onlinedocs/gdb/Separate-Debug-Files.html
Explica el funcionamiento de GDB para tener los symbols en un fichero a parte.
Parece que el binario stripped tiene un código para chequear que lo symbols son del mismo build.


## Cargar symbols de un fichero externo
Eso nos vale para debugear un binario stripped o sin debug info

gdb a.out
> symbol-file a.out.debug


# CentOS/RedHat
Para instalar los simbolos de un binario
yum install -y yum-utils
debuginfo-install -y PKG

https://fedoraproject.org/wiki/Packaging:Debuginfo
Estos paquetes instalan los binarios not stripped (con debug info) en /usr/lib/debug, y el código fuente en /usr/src/debug



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

finish
  ejecutar hasta salir de la función

break context_switch if next == init_task
  breakpoints condicionales

b *0x7f41a4a62348
b *main + 4
  poner un breakpoint en una direc de memoria

Ejecutar una serie de comandos cuando llegamos a un breakpoint
command BP
> print xxx


También podemos poner puntos de parada en funciones usando el nombre:
b nombre_func

Hacer print de un puntero conviertiendolo primero:
p ((zbx_hc_item_t *)history_items->values[1])->tail

Imprimir en hexadecimal los 8 bytes a partir de la dirección de memoria pasada:
x/xg 0x7f41a4a62348

Lo mismo pero en formato binario:
x/tg 0x7f41a4a62348

Imprimir una dirección de memoria interpretándola como instrucciones, mostrar esa dirección y las 4 siguientes:
x/4i 0x555555555161


Declarar una variable, ejemplos:
set $foo = malloc(sizeof(struct funcOutStruct))
set $iter = malloc(sizeof(zbx_hashset_iter_t))

Llamar a una función sin retornar el resultado, usando una variable declarada por nosotros:
call zbx_hashset_iter_reset(&cache->history_items, $iter)

Devolviendo el resultado:
p (zbx_hc_item_t *)zbx_hashset_iter_next($iter)

Imprimir tipo de un dato
ptype FOO

Ver donde está las zonas de memoria usadas por un proceso arrancado:
info proc mappings



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
Nada más arrancar parará el programa donde esté.
Podemos darle a "continue" y hacer control+c para volverlo a parar donde pille.




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

tbreak SPEC
  temporary breakpoint, se borra tras parar en ese punto

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



# Scripts
Ejecutar un script con gdb y salir:
gdb -p 5863 --batch -x simple.gdb

simple.gdb:
p hc_mem->used_size


# Python
https://sourceware.org/gdb/current/onlinedocs/gdb/Python.html#Python
A partir de la version 7 de gdb

API Python
https://developers.redhat.com/blog/2017/11/10/gdb-python-api/
explicando el por que de una api python y algunos ejemplos (aunque los ejemplos no son muy buenos, según comenta uno)

https://interrupt.memfault.com/blog/automate-debugging-with-gdb-python-api
https://sourceware.org/gdb/current/onlinedocs/gdb/Writing-a-Pretty_002dPrinter.html
https://sourceware.org/gdb/onlinedocs/gdb/Python-API.html#Python-API
https://github.com/bminor/binutils-gdb/blob/master/gdb/python/


Script sencillo que usa la API de python:
simple.py:
import gdb

def main():
    gdb.execute("source pretty_printer_zabbix.py")
    gdb.execute("b hc_pop_items")
    gdb.execute("continue")
    gdb.execute("p cache->history_items")

main()

Lo ejecutamos con:
gdb -p PID -P simple.py

Ejemplo más complejo hecho para zabbix: gdb_zabbix_cache.py


Podemos obtener variables y traerlas a python:
myval = gdb.parse_and_eval ('cache->history_items')


Eventos a los que podemos subscribirnos desde python
https://sourceware.org/gdb/current/onlinedocs/gdb/Events-In-Python.html#index-SignalEvent_002estop_005fsignal-2015
Por ejemplo, subscribirnos a los breakpoints, de manera que se llame a una func cada vez que se llegue a un breakpoint


Cuidado con pararnos en un breakpoint, no podemos hacer ciertas cosas
https://blog.0x972.info/?d=2015/05/12/08/52/11-gdbpython-executing-code-upon-events



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



# Remote
https://developers.redhat.com/blog/2015/04/28/remote-debugging-with-gdb/

yum install -y gdb-gdbserver
gdbserver :9999 --attach 14011
  el proceso 14011 se parará al arrancar gdbserver

En una máquina remota:
(gdb) target remote hostname:9999
se pondrá a bajar los binarios para obtener los symbols. Puede tardar un rato
Las fuentes (.c) no los bajará, tendremos que tenerlos en local.


Una forma más directa
(gdb) target remote | ssh -T xyz.example.com gdbserver - --attach 5312<Paste>

O sin especificar un pid, para luego añadirlos:
(gdb) target extended-remote | ssh -T root@xyz.example.com gdbserver --multi -

