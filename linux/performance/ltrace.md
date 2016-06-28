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

Para mostrar los argumentos correctamente hace falta definir la fución:
http://developers.redhat.com/blog/2014/07/10/ltrace-for-rhel-6-and-7/


Versión gráfica parecida: sysprof

# Problemas
No muestra las llamadas entre shared libs
Los parametros se muestran con el puntero de memoria*

*When printing out a call, it would be very nice to print its arguments as well (just like strace does). But the set of system calls is finite and fairly constant, and at least on Linux, very very stable, so it’s possible to encode the knowledge of those into strace itself. But of library calls there’s essentially infinite number, so that approach can’t work.
http://developers.redhat.com/blog/2014/07/10/ltrace-for-rhel-6-and-7/

# latrace
http://people.redhat.com/jolsa/latrace/index.shtml
http://www.software-architect.net/blog/article/date/2015/05/05/tracing-shared-library-calls-with-ltrace-and-latrace.html

Nos da informacion entre shared libs

El programa debe conocer a priori que tipos de datos se están pasando las funciones para poder mostrarlo correctamente (también se puede hacer con latrace).
Esto se hace definiendo en un fichero a parte la función y los tipos de datos.
Ejemplo:
void helloFunc(const char* s);

Y luego se lo pasamos con -a:
latrace -a latrace.h -A ./hello


Si no funciona, poner -v para ver donde está el error.
