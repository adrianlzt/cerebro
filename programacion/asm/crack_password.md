Ejemplo de como piratear un programa muy sencillo:


#include<stdio.h>
#include <string.h>

int main(int arg_count,char ** arg_values)
{
 printf("Password: ");
 char pass[10];
 scanf("%s",pass);
 
 if (strcmp(pass,"adri")) {
  return 1;
 } else {
  printf("Estas dentro\n");
 }
 return 0;
}


# gcc -o crack crack.c
# gdb crack
(gdb) disassemble main
Busco la linea donde se hace una comparacion
0x00000000004006fa <+94>:    test   %eax,%eax
0x00000000004006fc <+96>:    je     0x400705 <main+105>

Lo ejecuto hasta el main:
(gdb) b main
(gdb) r

Miro donde vamos:
(gdb) disassemble

Voy avanzando línea a línea (me da problemas poner un breakpoint):
(gdb) ni
(gdb) ni
...
Hasta llegar a la línea de test (en medio me saltará para que ponga la password)
=> 0x00000000004006fa <+94>:    test   %eax,%eax

Tras ejecutar una vez mas ni comprobamos las eflags, buscando la ZF (que indicaría que la comprobación de la pass ha sido correcta).
(gdb) print $eflags
$1 = [ PF IF ]

Veremos que el flag ZF no está presente.
Aqui viene el hack, setearemos ese flag, poniéndolo a uno, para que el programa piense que hemos puesto bien el password.

(gdb) print /t $eflags
$2 = 1000000110

1000000110 + 100000 = 1000100110 = 0x246
(gdb) set ($eflags)=0x246
(gdb) info registers eflags
eflags         0x246    [ PF ZF IF ]

(gdb) c
Continuando.
Estas dentro
!!!!


