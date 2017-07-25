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

Tamaño en bytes (conocido por el compilador, antes del inicio del programa):
sizeof(datos)

Tamaño en número de elementos:
sizeof(datos)/sizeof(datos[0])

No podemos hacer:
int *p = datos;
sizeof(p);
Este sizeof será el tamaño de la dirección de memoria almacenada por p.
La diferencia está en que la variable "datos" tiene información del tiempo de compilación que el puntero no tiene.

Este detalle es importante si queremos pasar un array como argumento.
Para pasar el array tendremos que pasarlo como un array, por lo que no podremos obtener su tamaño.
Típicamente lo que se hará es pasar el puntero al array y su tamaño como otro parámetro:
void func(int *array; int size);

Otra forma (más del estilo C++):
void func(int *begin, int *end);
// Tipicamente meteremos un chequeo para comprobar si la secuencia esta vacia (begin == end)



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
