// CUIDADO con esta funcion
// Puede traer problemas de seguridad
//
//
// Este ejemplo guarda un número en n.

int n;
printf("Introduce un numero: ");
scanf("%d",&n);

int a,b,c;
scanf("%d %d %d", &a, &b, &c);
// Si no metemos todo lo que espera scanf, seguirá esperando por los datos

// Este ejemplo guarda un caracter en m.

char m;
printf("Introduce un caracter: ");
scanf("%c",&m);

// Este ejemplo guarda una cadena de caracteres (solamente una palabra) en cad.
// Notese la ausencia de &

char cad[20];
printf("Introduce una palabra: ");
scanf("%s",cad); // PELIGRO! Buffer overflow

printf("Introduce una palabra: ");
scanf("%19s",cad);  // lee máximo 19 caracteres (dejando uno para el \0) y le concatena el caracter cero.
// Manera de evitar el buffer overflow

// Otra manera segura es que scanf haga alloc de la memoria necesaria
// https://stackoverflow.com/questions/38685724/difference-between-ms-and-s-scanf
char *msg;
scanf("%ms", &msg);
free(msg); // Deberemos liberarla tras su uso
