http://www.tutorialspoint.com/cprogramming/c_arrays.htm

Empiezan en 0:
int datos[100]
datos[0] = 0
datos[99] = 2

Tamaño:
sizeof(datos)

Escribir a un fichero:
fwrite(clientdata, sizeof(char), sizeof(clientdata), fd);



# Pasar un array a una func:
static char arr[1024] = "hello";
adri(arr);

void adri(char *data) {
  printf("data: %s\n", data);
  }
