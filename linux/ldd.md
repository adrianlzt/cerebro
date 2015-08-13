Un binario linkado estaticamente no requiere de ningún otro fichero para funcionar.
Uno linkado dinámicamente si necesita otros ficheros (ldd nos dirá cuales)


ldd fichero.so
  Nos dice que librerias require

-v para mas info, por ejemplo para obtener las versiones de GLIBC requeridas.


Una vez nos diga que libreria requiere, miraremos el fichero, que será un enlace blando a la real:
ll /lib64/libc.so.6
lrwxrwxrwx. 1 root root 12 Mar  7  2014 /lib64/libc.so.6 -> libc-2.12.so



objdump -o fichero.so
  nos da más info. Nos dice las versiones requeridas, aunque esto no me cuadra. Dice que quiere:
    required from libc.so.6:
      0x09691a75 0x00 02 GLIBC_2.2.5

  Pero al ejecutarlo dice
  ImportError: /lib64/libc.so.6: version `GLIBC_2.14' not found


ldd as mentioned elsewhere will show all direct and indirect libs - everything it needs at runtime. This may not be a complete list, since you may dynamically open things with dlopen(), but this should work 99% of the time.
readelf -d fichero.so

In the usual case, ldd invokes the standard dynamic linker (see ld.so(8)) with the LD_TRACE_LOADED_OBJECTS environment variable set to 1, which causes the linker to display the library dependencies. Be aware, however, that in some circumstances, some versions of ldd may attempt to obtain the dependency information by directly executing the program. Thus, you should never employ ldd on an untrusted executable, since this may result in the execution of arbitrary code.
