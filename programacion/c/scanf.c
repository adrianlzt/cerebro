// Este ejemplo guarda un número en n.
 
int n;
printf("Introduce un numero: ");
scanf("%d",&n);
 
// Este ejemplo guarda un caracter en m.
 
char m;
printf("Introduce un caracter: ");
scanf("%c",&m);
 
// Este ejemplo guarda una cadena de caracteres (solamente una palabra) en cad. 
// Notese la ausencia de &
 
char cad[20];
printf("Introduce una palabra: ");
scanf("%s",cad);
 
printf("Introduce una palabra: ");
scanf("%10s",cad);  // lee máximo 10 caracteres y le concatena el caracter cero.
