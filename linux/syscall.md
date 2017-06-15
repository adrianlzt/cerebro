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
