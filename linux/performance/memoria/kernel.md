http://unix.stackexchange.com/questions/97261/how-much-ram-does-the-kernel-use

Memoria consumida por modulos (disk? ram?)
$ awk '{print $1 " " $2 }' /proc/modules | head -5


https://www.kernel.org/doc/Documentation/kmemleak.txt

Kmemleak provides a way of detecting possible kernel memory leaks in a way similar to a tracing garbage collector (https://en.wikipedia.org/wiki/Garbage_collection_%28computer_science%29#Tracing_garbage_collectors), with the difference that the orphan objects are not freed but only reported via /sys/kernel/debug/kmemleak. A similar method is used by the Valgrind tool (memcheck --leak-check) to detect the memory leaks in user-space applications.

CONFIG_DEBUG_KMEMLEAK in "Kernel hacking" has to be enabled in kernel



http://halobates.de/memory.pdf
