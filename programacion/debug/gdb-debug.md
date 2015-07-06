http://darkdust.net/files/GDB%20Cheat%20Sheet.pdf
http://www.thegeekstuff.com/2010/03/debug-c-program-using-gdb/
http://beej.us/guide/bggdb/#qref
http://www.yolinux.com/TUTORIALS/GDB-Commands.html

Como hacer debug de programas con gdb.

1. Es necesario compilar el programa para que hacepte debug:
	gcc -g programa.c -o programa

2. Arrancar el gdb con el programa
	gdb programa

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
Copiamos el Entry Point
gdb> break *0xXXXX (el entrypoint)
gdb> set disassembly-flavor intel  (sintaxis INTEL, primer argumento lo que recibe, y el segundo lo que pasa)
gdb> layout asm


Comandos:
win: divide la pantalla, mostrando arriba el código y la línea procesada, y abajo para meter órdenes!! Es la interfaz ncurses TUI. Puede que se muestre mal con screen
  layout prev/next: distintos layouts: ensamblador, valores de registros, codigo, y combinaciones de estos.
  focus next/prev: focus en las distintas ventas para poder hacer scroll
  refresh: refresh the screen
  update: Update the source window and the current execution point. 
  https://sourceware.org/gdb/onlinedocs/gdb/TUI-Commands.html

r: run
c: continue
l: listar el codigo
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
printf -- Printf "printf format string"
show args: muestra los parametros con los que hemos ejecutado el programa
show environment: muestra las variables de entorno
whatis: información sobre el tipo de una variable
set var variable=34, definir el valor de una variable
j,jump <linea>: continua la ejecución en esa linea

