# yasm -p gas -f elf64 hello_amd64.s -o hello.o
# ld -o hello hello.o
# ./hello
#
.section .data
 mystring: .ascii "Hello World!\n"
.section .text
.globl _start
_start:
    mov $1, %rax        # Syscall No. 4: = 'write'
    mov $1, %rdi        # File Descriptor
    mov $mystring, %rsi # Memory address of string
    mov $13, %rdx       # strlen
    syscall             # call rax (=write), argument is memory address & strlen

    mov $60, %eax       # Syscall No. 1 = 'exit'
    mov $0, %rdi        # clear ebx
    syscall             # call rax (=exit), return value in ebx
