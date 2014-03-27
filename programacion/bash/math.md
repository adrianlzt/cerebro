http://www.sal.ksu.edu/faculty/tim/unix_sg/bash/math.html

En pricipio bash solo acepta integers.
zsh si soporta decimales.

Podemos usar 'bc' para hacer los cálculos, pero no está siempre instalado.

Mejor hacer uso de awk:
echo "$IMG_WIDTH $IMG2_WIDTH" | awk '{printf "%.2f \n", $1/$2}'

Mejorado:
TW_PERCENTAGE=$(awk "BEGIN {printf \"%.2f\",${TIME_WAIT}/${TOTAL}}")

