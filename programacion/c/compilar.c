Antes de compilar tendremos el preprocesor
Despues de compilar se lanzará el linker


gcc -Wall -o main main.c
  -Wall hace que salgan warnings de cosas que pueden estar mal

Otras opciones para mostrar más errores
gcc -Wall -std=c99 -Wextra -pedantic -o main main.c


Si queremos añadir una lib
-l NOMBRE
Ejemplo: -luuid


Con -g haremos que podamos debugearlo con simbolos

El -o es para definir el nombre del fichero de salida (a.out será si no lo ponemos)

Si tenemos varios ficheros:
gcc file1.c file2.c -o ejecutable


# Compilar
Por defecto gcc compila y linka los ficheros.
Podemos forzar a que solo compile un fichero con:
gcc -c fichero.c
  esto generará el object file fichero.o

Podemos ver todo lo que hace gcc poniendo:
gcc -v ...

# Linkar
Enlazar object files para generar un fichero compilado
