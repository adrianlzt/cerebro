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
