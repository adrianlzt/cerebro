Limites:  http://www.tutorialspoint.com/c_standard_library/limits_h.htm
Tamaño de cada tipo: http://www.tutorialspoint.com/cprogramming/c_data_types.htm

https://github.com/srdja/Collections-C
A library of generic data structures including a list, array, hashtable, deque etc..


sizeof(char);

Tipos estandar:
#include <stdint.h>
int8_t, int16_t, int32_t, int64_t - enteros con signo (el numero son los bits, 1 bytes = 8 bits)
uint8_t, uint16_t, uint32_t, uint64_t - enteros sin signo
float - coma flotante de 32 bits
double - coma flotante de 64 bits

No usar char!
Los desarrolladores han abusado de char para representar un byte incluso cuando hacen operaciones sin signo. Es mucho más limpio usar uint8_t para representar un único byte sin signo y uint8_t * para representar una secuencia de bytes sin signo.

El único uso aceptable de char en 2016 es si una API ya existente necesita char (por ejemplo, strncat, printf,…) o si estás inicializando una cadena de texto de solo lectura (const char *hello = "hello";) porque el tipo de C para cadenas de texto sigue siendo char *

Además, en C11 tenemos soporte Unicode nativo y el tipo para cadenas UTF-8 sigue siendo char * incluso para secuencias multibyte como const char *abcgrr = u8"abc😬";.


Nunca usar "unsigned"

char
singned char
unsigned char

short
short int
signed short
signed short int

int
signed int

unsigned
unsigned int

long
long int
signed long
signed long int

unsigned long
unsigned long int

long long
long long int
signed long long
signed long long int

unsigned long long
unsigned long long int

float

double

long double
