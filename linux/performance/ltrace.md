ltrace - A library call tracer
Como strace pero a nivel de librerias

ltrace  is  a program that simply runs the specified command until it exits.  It intercepts and records the dynamic library calls which are called by the executed process and the signals which are received by that process.


ltrace -p 28870 -s 500 -Sf
  -p: Unimos ltrace al pid 28870
  -s: Linea de tamaño maximo 500 caracteres
  -S :muestra syscall (sería como strace)
  -f :sigue hijos


Muestra tiempos y recuento
-c


Versión gráfica parecida: sysprof
