# yasm -p gas -f elf64 hello_x86.s -o hello.o
# ld -o hello hello.o
# ./hello
#
.section .data
 mystring: .ascii "Hello World!\n"
.section .text
.globl _start
_start:
    mov $4, %eax        # Syscall No. 4: = 'write'
    mov $1, %ebx        # File Descriptor
    mov $mystring, %ecx # Memory address of string
    mov $13, %edx       # strlen
    int $0x80           # call eax (=write), argument is memory address & strlen
    mov $1, %eax        # Syscall No. 1 = 'exit'
    mov $0, %ebx        # clear ebx
    int $0x80           # call eax (=exit), return value in ebx
