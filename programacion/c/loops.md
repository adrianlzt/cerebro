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

continue;
  pasa a la siguiente interacción

break;
  sale del bucle
