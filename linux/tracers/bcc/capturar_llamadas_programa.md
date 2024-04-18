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

Usamos trace para filtrar por la funcion adri(), la "r:" es que obtenemos el retorno de la funcion y el argumento que recibe:
./trace 'r:/tmp/pruebas/a.out:adri "ret:%d  arg:%d", retval, arg1'

Necesitamos que el binario sea no stripped o tener los símbolos (mirar programacion/debug/debuginfo.md)

Ejecutamos el programa y vemos la salida del trace:
TIME     PID    COMM         FUNC             -
16:52:55 27867  a.out        adri             ret:13  arg:3


## Ejemplos con zabbix
Sacar las llamadas a la función zbx_setproctitle. Mostramos el primer argumento, tipo str.
 sudo ./trace 'r:/usr/bin/zabbix_server_postgresql:zbx_setproctitle "ret: %s", arg1'
