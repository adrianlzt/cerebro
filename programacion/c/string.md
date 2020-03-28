http://www.tutorialspoint.com/cprogramming/c_strings.htm

strings: series de caracteres terminadas por null char (\0)

char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char greeting[] = "Hello";
char * greeting = "Hello"; // no funcionará el sizeof(greeting) (mirar arrays.md)

sizeof(greeting); //cuando es un array, será la longitud del array más 1 (el caracter 0 al final)

Para usar printf mirar printf.md seccion #strings

Iterando una string:
for (char *p = message; *p; p++) {
  char c = *p;
  printf("%c\t", c);
}


while (*string++) {
  // algo
}



# Funciones sobre strings

#include <string.h>

strcpy(s1, s2);
Copies string s2 into string s1.

strcat(s1, s2);
Concatenates string s2 onto the end of string s1.

strlen(s1);
Returns the length of string s1.

strcmp(s1, s2);
Returns 0 if s1 and s2 are the same; less than 0 if s1<s2; greater than 0 if s1>s2. Puede devolver valores distintos de -1, 0, 1
Se puede usar para ordenar strings
strncmp(s1, s2, n); para comparar solo los n primeros caracteres

Variantes que no tienen en cuenta el case:
int strcasecmp(const char *s1, const char *s2);
int strncasecmp(const char *s1, const char *s2, size_t n);


strchr(s1, ch);
Returns a pointer to the first occurrence of character ch in string s1.

strstr(s1, s2);
Returns a pointer to the first occurrence of string s2 in string s1.


# strtok
http://www.tutorialspoint.com/c_standard_library/c_function_strtok.htm

Trocea una string en chunks delimitados por el caracter que le digamos.


# Caracteres especiales
\n nueva linea
\r volver al comienzo de linea (mirar ejemplo waiting.c para una barra que da vueltas)
\t tabulador
\\ la barra
\" comilla


# Detectar tipos de caracteres
#include <ctype.h>

isalnum(char): true si es una letra mayúscula o minúscula, o un número
isalpha(char): letras mayúscula o minúscula
islower(char): letras minúscula
isupper(char): letras mayúscula
isdigit(char): números
isxdigit(char): números hexadecimales
iscntrl(char): control chars (\n, \t, etc)
isgraph(char): caracteres gráfico (alfanuméricos y puntuación)
isspace(char): espacios en blanco (un cambio de línea entra aquí)
isblank(char): espacios en blanco en frases
isprint(char): como los graph más espacios en blanco
ispunct(char): caracteres de puntuacion



# Conversion de caracteres
#include <ctype.h>

tolower(char)
toupper(char)



# Números a string
sprintf

# Strings a números
Si queremos un control exacto es mejor usar expresiones regulares nuestras.

#include <stdlib.h>
double d = atof("123.456"); // ascii to float
int i = atoi("123"); // ascii to int


char * numbers = "12 0x123 101";
char * next = numbers;

// strtol parsea un número, según la base que le digamos y lo convierte a un long integer
// La cadena podra empezar por varios espacios en blanco y un caracter + o -
// Le pasaremos un puntero a la cadena y un puntero a un puntero que la función actualizará con la siguiente posición tras el número que haya parseado
// No parsea floats
int first = strtol(next, &next, 10);
int second = strtol(next, &next, 0); // base 0 -> que autodetecte la base del número (0x hex, 0123 oct, resto decimal)
int third = strtol(next, &next, 2); // binario
