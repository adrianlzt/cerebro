Para ver el contenido del clipboard.
Para ver posibles problemas, verlo con octal dump:

Dump en hexadecimal
xsel | od -t x


$ echo "abc" | xclip
$ xsel | od -t x
0000000 0a636261
0000004

a: 0x61
b: 0x62
c: 0x63

Se muestran los caracteres en orden inverso en cada byte.

hola que
estaría puesto en hexadecimal: 'aloh euq '

