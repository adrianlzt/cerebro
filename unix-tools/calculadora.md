<https://numbat.dev/>
<https://github.com/sharkdp/numbat>
<https://numbat.dev/doc/example-numbat_syntax.html>
  Es la evolución de insect
    <https://github.com/sharkdp/numbat/blob/master/assets/reasons-for-rewriting-in-rust.md>
    <https://github.com/sharkdp/insect>
    <https://insect.sh/>

Convierte unidades
Se pueden asignar constantes, crear funciones
Tiene autocompletado.
Ejemplo calculando el tiempo de envio de un fichero, en minutos, dada una velocidad:
  500 MB / 5 Mbps -> min

ans
  último resultado

Devoler el último resultado con el número de decimales que queramos:
"{ans:.3}"

Cuidado con el tema del redondeo:
<https://github.com/sharkdp/insect/issues/400>
<https://github.com/sharkdp/numbat/issues/179>
Internamente tiene el número correcto, pero con la notación "e" muestra un redondeo.

Si queremos definir una unidad de algo "random"
unit thing: Scalar

Y podemos hacer:
(3 thing/s) * 3 min

# BC

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

Redondear:
$ echo "scale=0;90/24" | bc -s
3

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

Octal a hexadecimal
echo "obase=16; ibase=8; octal-number-here" | bc

Decimal to Binary
echo "obase=2; 23" | bc

Decimal to Octal number
echo "obase=8; 23" | bc

Decimal to Hex number
echo "obase=16; 23" | bc

Binary to decimal
echo "ibase=2; 11010101" | bc

Oct to decimal
echo "ibase=8; 723" | bc

Hex to decimal
echo "ibase=16; 23" | bc

How about converting binary to Oct?
echo "ibase=2;obase=8; 1010101" | bc

Decimal to any base number
convert decimal number to base 4 number system
echo "obase=4; 23" | bc
