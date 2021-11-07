Ejemplo para generar un char con una cadena compleja.

#include <stdio.h>

char *buffer;
int a = 4;
asprintf(&buffer, "la cadena: %d", a);
Serial.println(buffer);



Si queremos hacer una función que haga forwarding de los parámetros podemos usar:
https://stackoverflow.com/a/62043871/1407722

Nos valdrá para tener una función que simule ser printf o similar y luego haga más cosas.
