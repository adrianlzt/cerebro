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


----

https://blogs.oracle.com/ksplice/entry/8_gdb_tricks_you_should

$ gdb victim 
start < shellcode 
  arranca victim pasando como stdin el contenido del fichero shellcode

disas 
  muestra el codigo ensamblador y donde estamos parados

break *0x00000000004005c1 
  punto de break en esa posicion de memoria*
cont 
  continuar
p $rsp 
  imprime el valor del registro %rsp
ni 
  next instruccion
si 
  step instruccion (entra en las funciones)
x/10i 0x400470

x/x displays elements in hex, x/d displays them as signed decimals, x/c displays characters, x/i disassembles memory as instructions, and x/s interprets memory as C strings.
  nos muestra el contenido de las 10 siguientes posiciones de memoria, traducidas a instrucciones (i), a partir de la posicion 0x400470

x/nfu addr
  n: numero de bloques de memoria que mostrar
  f: format (d, c, i, s, x)
  u: tamaño de los bloques (b, h, w, g). Por defecto words, 4 bytes

Ejemplo
(gdb) p format
$9 = 0x7ffff1916425 "%a %b %e %H:%M:%S %Z %Y"
(gdb) x/8c 0x7ffff1916425
0x7ffff1916425: 37 '%'  97 'a'  32 ' '  37 '%'  98 'b'  32 ' '  37 '%'  101 'e'

