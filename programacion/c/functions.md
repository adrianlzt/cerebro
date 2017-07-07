TIPO_RETORNO nombre_funcion(TIPO_ARG1 a, TIPO_ARG2 b) {
  ...
  return x;
}


int funcion(int c) {
  return 3;
}


Función void (no retorna nada):
void funcion(int c) {
  ...
}


Las variables que se pasan para argumentos obtienen una copia del objeto.
Si queremos modificar la varaible original lo haremos con punteros.

void modifica(int *a) {
  *a += 1;
}

int main() {
  int a = 0;
  modifica(&a);
  printf("a=%d\n", a);
  return 0;
}



# Function pointers
Creamos un puntero a una función.

int suma_uno(int a) {
  return ++a;
}

int (* convert)(int from) = suma_uno;

int main() {
  int a = 0;
  int b;
  b = convert(a);
  printf("b=%d\n", b);
  return 0;
}


Si suma_uno tuviese dos parametros y devolviese un double:
double (* convert)(int a, int b) = suma_uno;
