https://www.csee.umbc.edu/portal/help/nasm/sample_64.shtml

Mirar el makefile para ver como compilarlos:

nasm -f elf64 -l hello_64.lst  hello_64.asm
gcc -m64 -o hello_64  hello_64.o
