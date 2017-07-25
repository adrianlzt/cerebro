http://www.tutorialspoint.com/cprogramming/c_arrays.htm

Empiezan en 0:
int datos[100]
datos[0] = 0
datos[99] = 2

datos será un puntero al comienzo del array.


int values[] = {1,2,3,4,5};
int values[10] = {1,2,3,4,5}; // los no inicializados serán 0
char buffer[256] = { 0 }; // todo el array inicializado a 0

Punteros:
int * ptr = values;  // Puntero al primer elemento del array
int * otroptr = &values[2]; // Puntero al tercer elemento del array

ptr++; // avanzamos un elemento (si es tipo double, sabrá que debe avanzar 4 bytes)
ptr += 3; // avanzamos tres posiciones en el array

Tamaño en bytes:
sizeof(datos)

Tamaño en número de elementos:
sizeof(datos)/sizeof(datos[0])

Escribir a un fichero:
fwrite(clientdata, sizeof(char), sizeof(clientdata), fd);

Loop:
int numbers[] = {1,2,3};
for (int i=0; i<sizeof(numbers)/sizeof(numbers[0]); i++) { ... }


# Pasar un array a una func:
static char arr[1024] = "hello";
adri(arr);

void adri(char *data) {
  printf("data: %s\n", data);
  }
