Los headers files es donde se definen las funciones.
Solo se define la declaración, no su función.

Ejemplo:
void example(int data);


Generalmente cada archivo .c tendrá su respectivo .h donde estarán declaradas las funciones.

Si otro fichero.c necesita usar esas funciones, hará un import del .h de aquel fichero.


Un ejemplo más sencillo declarando las funciones en los propios ficheros .c:

// file1.c
int dame_dato();

int main() {
  return dame_dato();
}

// file2.c
int dame_dato() {
  return 3;
}


Como vemos en ese ejemplo, lo que necesita el file1 para poder llamar a "dame_dato", es tener definida la función antes de llamarla.
