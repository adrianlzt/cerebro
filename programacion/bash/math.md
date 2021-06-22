http://tldp.org/LDP/abs/html/arithexp.html 
num=$((num1 + num2))
num=$(($num1 + $num2))       # also works
num=$((num1 + 2 + 3))        # ...

http://www.sal.ksu.edu/faculty/tim/unix_sg/bash/math.html

En pricipio bash solo acepta integers.
zsh si soporta decimales.

Podemos usar 'bc' para hacer los cálculos, pero no está siempre instalado.

Mejor hacer uso de awk:
echo "$IMG_WIDTH $IMG2_WIDTH" | awk '{printf "%.2f \n", $1/$2}'

Mejorado:
TW_PERCENTAGE=$(awk "BEGIN {printf \"%.2f\",${TIME_WAIT}/${TOTAL}}")



# Numeros flotantes
echo | awk -v n1=5.65 -v n2=3.14e-22  '{if (n1<n2) printf ("%s < %s\n", n1, n2); else printf ("%s >= %s\n", n1, n2);}' 


El símbolo '>' en el echo es solamente por completitud, no esta haciendo nada

echo "100 > 67" | awk '{if ($1 > $3) exit 0; else exit 1;}'
if [[ $? == 0 ]]; then
    echo "100 es mayor que 67"
else
    echo "100 es menor que 67"
fi


# Factor
coreutil para factorizar un número
$ factor 34532
34532: 2 2 89 97




# Convertir unidades
https://www.gnu.org/software/coreutils/manual/html_node/numfmt-invocation.html
A partir de coreutils 8.21

numfmt --to=iec 5363453

Puede modificar una línea convirtiendo solo uno de los valores (típica salida con multicolumna).
También tiene una opción para ignorar la primera (o varias) líneas al comienzo.
$ echo -e "a     b    c\n2 3456332 20" | numfmt --header --field 2 --to=iec
a     b    c
2    3,3M 20

ps -eo pmem,comm,pid,maj_flt,min_flt,rss,vsz --sort -rss | numfmt --header --to=iec --field 5-7
  multiple fields desde v8.25

La posibilidad de usar multiples fields es a partir de cierta versión



# Secuencias de numeros / seq
mirar unix-tools/seq.md
https://www.gnu.org/software/coreutils/manual/coreutils.html#seq-invocation
seq 1 3
