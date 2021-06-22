i=0
let "i=i + 1"
echo $i
1


# Padding
printf "%05d" 1
  padding con 5 dígitos en total
  00001


Si queregemos tener padding, mirar unix-tools/seq.md

Otra opción:
for i in {00001..99999}; do
  echo $i
done

