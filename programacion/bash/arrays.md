http://www.tldp.org/LDP/abs/html/arrays.html#ARRAYREF

area[11]=23
area[13]=37
area[51]=UFOs
area2=( zero one two three four )

Añadir elemento
area+="pepe"

echo -n "area[11] = "
echo ${area[11]}    #  {curly brackets} needed.


Acceso con variable:
${host_gb[$i]}

Iterar
for element in "${array[@]}"
do
    echo "$element"
done


Iterar con indice:
for index in "${!array[@]}"
do
    echo "$index ${array[index]}"
done
