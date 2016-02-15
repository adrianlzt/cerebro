http://pubs.opengroup.org/onlinepubs/009695399/functions/strtoimax.html
Conversion de string a int
int size = strtoimax(argv[1], NULL, 10);



http://pubs.opengroup.org/onlinepubs/009695399/functions/atoi.html
#include <stdlib.h>
int minutes_to_event = atoi (argv[1])


http://pubs.opengroup.org/onlinepubs/009695399/functions/strtol.html
long minutes_to_event = strtol(argv[1])



printf("Numero: %s\n", argv[1]);
int leer = atoi(argv[1]);
printf("Numero: %i\n", leer);
