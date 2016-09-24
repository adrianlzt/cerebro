http://cboard.cprogramming.com/linux-programming/112053-using-shared-libraries-dlopen-plus-dlsym.html

Compilar la shared lib:
gcc -Wall -shared -o mapping.so -fPIC mapping.c

Compilar el programa que usa la shared lib:
gcc -l dl nlcnt.c -o nlcnt
