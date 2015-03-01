http://en.wikipedia.org/wiki/Linker_(computing)


Also called link editor and binder, a linker is a program that combines object modules to form an executable program. Many programming languages allow you to write different pieces of code, called modules, separately. This simplifies the programming task because you can break a large program into small, more manageable pieces. Eventually, though, you need to put all the modules together. This is the job of the linker.
In addition to combining modules, a linker also replaces symbolic addresses with real addresses. Therefore, you may need to link a program even if it contains only one module.


Si compilamos un programa en ensamblador:
nasm -f elf64 mio.asm

Y le hacemos un dump:
objdump -D mio.o

Veremos que no está colocado en ningún sitio de la memoria, empieza en la dirección 0000:
0000000000000000 <_start>:
   0: ba 03 00 00 00        mov    $0x3,%edx
   5: b9 00 00 00 00        mov    $0x0,%ecx


Una vez "linkado"
ld -s mio.o -o mio
  (el -s es para quitar simbolos de debug e información innecesaria, 'strip')

Veremos que el binario ya tiene una dirección de memoria:
objdump -D mio
00000000004000b0 <.text>:
  4000b0: ba 03 00 00 00        mov    $0x3,%edx
  4000b5: b9 d4 00 60 00        mov    $0x6000d4,%ecx

Veremos por ejemplo que se resuelve la dirección donde estaba el dato para poner la dirección de memoria real donde está almacenado.
