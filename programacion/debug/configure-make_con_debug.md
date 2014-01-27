Si queremos generar unos binarios debugables a partir del código fuente:

Mirar que CFLAGS define 'configure'. Mirando dentro del fichero, o ejecutándolo y mirando el Makefile.
./configure CFLAGS="la-que-tuviese -DDEBUG"
make
make install
