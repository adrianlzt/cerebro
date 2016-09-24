Si queremos capturar las llamadas que realiza un programa a otras funciones suyas.


Ejemplo de programa simple:
#include<stdio.h>

int adri(int valor) {
  return valor;
}

int main(int arg_count,char ** arg_values)
{
 printf("AAAABBBB\n");
 int x;
 x = adri(3);
 printf("valor: %d\n", x);
 return 0;
}


gcc programa.c -o programa

Usamos trace para filtrar por la funcion adri():
./trace 'r:/tmp/pruebas/a.out:adri "ret:%d  arg:%d", retval, arg1'

Ejecutamos el programa y vemos la salida del trace:
TIME     PID    COMM         FUNC             -
16:52:55 27867  a.out        adri             ret:13  arg:3
