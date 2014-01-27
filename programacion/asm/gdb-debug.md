http://darkdust.net/files/GDB%20Cheat%20Sheet.pdf
http://www.thegeekstuff.com/2010/03/debug-c-program-using-gdb/

gcc -g programa.c programa
gdb programa


Si no tenemos símbolos (el código fuente):
gdb "whatever"
break __libc_start_main
r

Para ver el código ensamblador:
disassemble main

Imprime como cadena una posición de memoria
x/s 0x40083b

Mas sobre imprimir direcciones de memoria (http://www.delorie.com/gnu/docs/gdb/gdb_56.html)

Mostrar las flags:
info registers eflags
print $eflags
print/x $eflags  (en hexadecimal)

Setear las flags:
set ($eflags)=0x335


Comandos:
r: run
b <cosa,linea,...> : break point
n: next (no entra en funciones)
s: step (si entra en funciones)
ni: next assembler (no entra en funciones)
si: step assembler (si entra en funciones)
where: donde estamos
info registers: muestra los registros
print
  /x  hexadecimal
  /t  binario


Tipos de formato de salida: http://www.delorie.com/gnu/docs/gdb/gdb_55.html
