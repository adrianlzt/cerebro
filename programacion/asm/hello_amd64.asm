; http://tldp.org/HOWTO/Assembly-HOWTO/build.html
;
; Compilar (genera hello.o):
; nasm -f elf64 hello.asm
; linkar
; ld -s -o hello hello.o
; ./hello

section .text                   ;section declaration

                                ;we must export the entry point to the ELF linker or
    global  _start              ;loader. They conventionally recognize _start as their
                                ;entry point. Use ld -e foo to override the default.

_start:

                                ;write our string to stdout

    mov     rdx,len             ;third argument: message length
    mov     rsi,msg             ;second argument: pointer to message to write
    mov     rdi,1               ;first argument: file handle (stdout)
    mov     rax,1               ;system call number (sys_write)
    SYSCALL                     ;call kernel

                                ;and exit

    mov     rdi,0               ;first syscall argument: exit code
    mov     rax,60              ;system call number (sys_exit)
    SYSCALL                     ;call kernel

section .data                   ;section declaration

msg db      "Hello, world!",0xa ;our dear string
len equ     $ - msg             ;length of our dear string
