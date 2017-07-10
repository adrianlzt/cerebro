http://www.network-theory.co.uk/docs/gccintro/gccintro_11.html
http://stackoverflow.com/questions/5128664/how-to-split-a-c-program-into-multiple-files

gcc main.c hello.c -o ejecutable
./ejecutable


Un programa para poder usar una función tiene que tenerla previamente declarada.
Por esta razon se usan los include de fichero .h.
En estos ficheros .h se declaran (que no implmentan) las funciones.

También se puede en un fichero .c declarar las funciones que vayamos a usar de otros ficheros.c
Ejemplo tonto:

// fichero1.c
int mult(int a, int b) {
  return a*b;
}

// main.c
int mult(int, int);
int main() {
  mult(3,4);
}


Tipicamente lo que haremos será usar headers files para almacenar las declaraciones de las funciones.
Ejemplo:
// math.h
int mult(int, int);
