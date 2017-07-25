while (expr) {
  ...
}


do {
  ...
while (expr);


for (int i=0; i<5; i++) {
  ...
}

Loop para un array:
int numbers[] = {1,2,3};
for (int i=0; i<sizeof(numbers)/sizeof(numbers[0]); i++) { ... }

Otra forma (vamos incrementando un puntero que recorre el array hasta que llega a su fin):
for (int *p=numbers; p != numbers+(sizeof(numbers)/sizeof(numbers[0])); p++)
  printf("%d\n", *p);


continue;
  pasa a la siguiente interacción

break;
  sale del bucle
