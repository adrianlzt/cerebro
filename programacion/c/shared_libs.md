Generar una shared lib:
http://stackoverflow.com/questions/14884126/build-so-file-from-c-file-using-gcc-command-line
http://tldp.org/HOWTO/Program-Library-HOWTO/more-examples.html

Mirar ejemplo en: shared_libs_example/

gcc -Wall -shared -o libhello.so -fPIC hello.c
  -g para que sea debuggeable
  -l xx si usa alguna lib externa

gcc -l dl nlcnt.c -o nlcnt



Si puede que vayamos a volver a abrir la shared lib y esta usa variables estáticas, podemos usar el flag RTLD_NODELETE para conservar los valores.
Esto lo he utilizado con libuuid para evitar que al abrir, cerrar y volver a abrir, libuuid vuelva a crear otro FD contra /dev/urandom


Los recursos que se abran en las funciones de la shared lib serán compartidas. Si la shared lib abre un fichero, este no será cerrado al hacer dlclose.
http://stackoverflow.com/questions/30945894/dlclose-does-not-close-library-open-file-handles


# Donde se buscan las shared libs
LD_LIBRARY_PATH=
/etc/ld.so.conf
