https://github.com/0xAX/linux-insides/blob/master/SysCall/syscall-1.md

http://www.digilife.be/quickreferences/qrc/linux%20system%20call%20quick%20reference.pdf
linux system call quick reference.pdf

Relaciones entre numero de syscall y su nombre
https://github.com/torvalds/linux/blob/master/include/uapi/asm-generic/unistd.h

En vez de "master", poner la versión del kernel que corresponda.
"v3.10" por ejemplo


# Algunas syscalls importantes
read - read bytes from a file descriptor (file, socket)
write - write bytes from a file descriptor (file, socket)
open - open a file (returns a file descriptor)
close - close a file descriptor
fork - create a new process (current process is forked)
exec - execute a new program
connect - connect to a network host
accept - accept a network connection
stat - read file statistics
ioctl - set I/O properties, or other miscellaneous functions
mmap - map a file to the process memory address space
brk - extend the heap pointer


# Definiciones
https://unix.stackexchange.com/questions/421750/where-do-you-find-the-syscall-table-for-linux
printf __NR_open | gcc -include sys/syscall.h -E -

Aqui nos sacará los ficheros donde obtiene las syscall


# Modificarlas
http://www.alfonsobeato.net/c/filter-and-modify-system-calls-with-seccomp-and-ptrace/
  la opción buena
http://www.alfonsobeato.net/c/modifying-system-call-arguments-with-ptrace/
  mala performance esta última
https://nullprogram.com/blog/2018/06/23/
  creo que la misma idea que el anterior


Truco con el LD_LIBRARY_PATH, pero solo funciona para llamadas a glibc
http://www.alfonsobeato.net/c/modifying-system-call-arguments-with-ptrace/

Proyecto interesante que nos puede ayudar, pero no permite reescribir, solo filtrar y aplicar política. Un poco más potente que seccomp (que nos permite aplicar las políticas pero con un poco menos de flexibilidad).
https://github.com/google/nsjail

Ejecutando VPN en el host pero aplicando una política seccomp:
sudo ./nsjail --disable_clone_newuser --disable_clone_newns --disable_clone_newpid --disable_clone_newipc --disable_clone_newuts --disable_clone_newcgroup --disable_clone_newnet --keep_caps --chroot / -P ioctl_deny.policy -- /usr/bin/pulsesvc -h ...



Para anular una syscall:
SECCOMP_RET_TRACE
The  tracer  can  skip  the  system  call by changing the system call number to -1
