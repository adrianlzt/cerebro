Como strace pero a nivel de librerias


ltrace -p 28870 -s 500 -Sf
Unimos ltrace al pid 28870
Linea de tamaño maximo 500 caracteres
-S :muestra syscall
-f :sigue hijos
