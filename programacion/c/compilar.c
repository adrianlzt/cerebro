gcc -o main main.c

Si queremos añadir una lib
-l NOMBRE
Ejemplo: -luuid


Con -g haremos que podamos debugearlo con simbolos

El -o es para definir el nombre del fichero de salida (a.out será si no lo ponemos)

Si tenemos varios ficheros:
gcc file1.c file2.c -o ejecutable
