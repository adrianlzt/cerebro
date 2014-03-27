BC:
Para que use decimales en algunos SOs hay que arrancar con bc -l

last es el último resultado
variable=last
variable+1

var1=1.4
var1++
var1 ahora vale 2.4

Se pueden usar: <, >, <=, >=, ==, !=, !expr, expr && expr, expr || expr
sqrt()
for, while, if, ...
define name (param) {}

Ejemplos:
pi=$(echo "scale=10; 4*a(1)" | bc -l)

Se puede usar para programar, en cuyo caso podemos usar read() para leer de la entrada estandar



$ echo $(( 6 / 2 ))
3
$ echo $(( 6 * 2 ))
12
$ echo $(( 6 / 7 ))
0


expr 300 + 9230
9530
$ expr 6 \* 32
192
$ expr 32 \/ 4
8
$ expr 5 + 5.5
expr: non-numeric argument
$ expr 


Convertir hexadecimal en decimal:
echo "ibase=16; 7F" | bc
