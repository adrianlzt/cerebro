http://www.cplusplus.com/reference/cstdio/printf/

No es estandar el formato en todos los compiladores y sobre todas las plataformas.
https://stackoverflow.com/questions/13590735/printf-long-long-int-in-c-with-gcc
En gcc, compilando con -Wall detectará errores si intentamos usar printf con un tipo que no corresponde

d or i	Signed decimal integer	392
u	Unsigned decimal integer	7235
o	Unsigned octal	610
x	Unsigned hexadecimal integer	7fa
X	Unsigned hexadecimal integer (uppercase)	7FA
f	Decimal floating point, lowercase	392.65
  .4f mostrar 4 decimales
F	Decimal floating point, uppercase	392.65
e	Scientific notation (mantissa/exponent), lowercase	3.9265e+2
E	Scientific notation (mantissa/exponent), uppercase	3.9265E+2
g	Use the shortest representation: %e or %f	392.65
G	Use the shortest representation: %E or %F	392.65
a	Hexadecimal floating point, lowercase	-0xc.90fep-2
A	Hexadecimal floating point, uppercase	-0XC.90FEP-2
c	Character	a
s	String of characters	sample
p	Pointer address	b8000000
n	Nothing printed.
The corresponding argument must be a pointer to a signed int.
The number of characters written so far is stored in the pointed location.
%	A % followed by another % character will write a single % to the stream.	%

length	d i	u o x X	f F e E g G a A	c	s	p	n
(none)	int	unsigned int	double	int	char*	void*	int*
hh	signed char	unsigned char					signed char*
h	short int	unsigned short int					short int*
l	long int	unsigned long int		wint_t	wchar_t*		long int*
ll	long long int	unsigned long long int					long long int*
j	intmax_t	uintmax_t					intmax_t*
z	size_t	size_t					size_t*
t	ptrdiff_t	ptrdiff_t					ptrdiff_t*
L			long double

%lld long long int
%llu long long unsigned int
(mirar nota sobre formatos no estandar al comienzo)


# Alineamiento
El número ocupará tantos caracteres como especifiquemos, rellenando con espacios en blanco a la izquierda

printf("%10d\n", 123);
printf("%10.2f\n", 123.456);

       123
    123.46

Si queremos left-aligned:
printf("%-10d foo\n", 123);
printf("%-10.2f bar\n", 123.456);

123        foo
123.46     bar


Si queremos definir ese valor dinámicamente:
printf("%*.*f bar\n", padding, floating_point, 123.456);



# Strings
char * message = "hello world, goobdy ruel world";
printf("%s\n", message);

Solo una substring con los 11 primeros caracteres:
int number = 11;
printf("%.*s\n", number, message);

Tambien directamente:
printf("%.5s\n", message);

# Seguridad
printf(variable);
Esto se puede hacer, pero es peligroso.
Si dentro de "variable" puede venir contenido escrito por un usuario malicioso:
https://stackoverflow.com/questions/7459630/how-can-a-format-string-vulnerability-be-exploited



# sprintf
Como printf, pero en vez de escribir a stdout, almacenamos en una varible el resultado.

char buffer[500];
sprintf(buffer, "some text with values %d", value);


No comprueba que lo que estemos pasando cabe en la variable.
Si usamos -Wall y el compilador conoce las variables nos avisará del overflow de variable.
Si no lo conoce y se ejecuta dará un core dumped con mensaje tipo:
*** stack smashing detected ***: ./a.out terminated
======= Backtrace: =========
...
======= Memory map: ========
...
[2]    969 abort (core dumped)  ./a.out 12345667788


Si estamos usando el stack, la variable crecerá pisando la siguiente variable que se encuentre en el stack.
En el caso del heap, pisará la siguiente variable del heap.
Si nos pasamos del tamaño del heap, dara un:
[2]    18932 segmentation fault (core dumped)  ./a.out


Si estamos en una función que no sea main(), podríamos pisar el puntero a la función donde debemos retornar.
Para evitar esto (usable como exploit), los compiladores ponen "guards" para evitar que se sobreescriban esas posiciones de memoria.


## Opciones seguras a sprintf

### snprintf
Le pasamos el número máximo de bytes que puede escribir
int snprintf(char *str, size_t size, const char *format, ...);


### asprintf
No estandar de C. GNU extension.
Cuenta los bytes que necesita, hace un malloc de ese tamaño y pone el puntero que le hayamos pasado apuntando al comienzo de ese malloc.

#define _GNU_SOURCE
#include <stdio.h>
char *buffer;
asprintf(&buffer, "la cadena");
