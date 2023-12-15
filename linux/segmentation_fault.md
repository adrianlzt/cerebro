https://unix.stackexchange.com/questions/132192/running-application-ends-with-segmentation-fault?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

Se produce porque la app intenta acceder a una región de memoria que no le pertenece.
El kernel le envía la señal SIGSEGV para matarla.

Para obtener el stack trace de una aplicación que falla con "Segmentation fault"
gdb programa
> run
Aqui veremos quien causa el fallo
Para ver el backtrace:
> bt


Para generar un Segmentation fault

main.c:
```
#include <stddef.h>
int main()
{
    int *p = NULL;
    *p = 1;
}
```


gcc main.c
./a.out


# gcore, generar .core
Generar un core dump de un proceso en ejecución:

gcore -o fichero.dump PID




# catchsegv
Comando para lanzar un programa que da un core dump y obtener maś info
https://www.commandlinux.com/man-page/man1/catchsegv.1.html

catchsegv programa

Eliminado: https://savannah.gnu.org/forum/forum.php?forum_id=10111#:~:text=The%20catchsegv%20script,%C2%A0%20been%20removed



# addr2line
http://ablagoev.github.io/linux/adventures/commands/2017/02/19/adventures-in-usr-bin.html#addr2line

A partir de una línea tipo
php-fpm[6048]: segfault at 10 ip 00007f46db77a8fb sp 00007fffa155e2d0 error 4 in xcache.so[7f46db763000+23000]
Obtener la línea del código que lo generó


# chap
https://github.com/vmware/chap

Analyzes un-instrumented ELF core files for leaks, memory growth, and corruption.
Análisis de core dumps.

Probado con python, pero es dificil sacar algo en claro, ya que no explica que es cada cosa
https://github.com/vmware/chap/blob/master/USERGUIDE.md#patterns-related-to-python
