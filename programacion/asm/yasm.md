http://yasm.tortall.net/

Compilador que vale tanto para formato Intel como AT&T (as)

AS (AT&T) syntax
yasm -p gas -f elf64 hello.asm -o hello.o

Intel syntax:
yasm -p nasm -f elf64 hello.asm -o hello.o
