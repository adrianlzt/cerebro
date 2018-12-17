tail -f fichero.log
Sigue al fichero, mostrando los nuevos añadidos

tail -200 fichero.log
muestra las 200 ultimas lineas

tail -200f fichero.log
muestra las 200 ultimas lineas y sigue al fichero

tail -F fichero.log
sigue al fichero, y se se elimina, o mueve, vuelve a abrir el fichero.log
Nos puede valer para dejar el tail apuntando a un fichero que aun no existe


Nos muestra todo el fichero salvo la primera linea
cat fichero | tail -n +2

Borrar todos los ficheros del directorio salvo los dos más nuevos:
ls -1t | tail -n +3 | xargs rm



Cuidado con concatenar varios greps con tails:
echo -e "11\n12\n13\n14\n15\n16\n17\n18\n19\n20" > texto
tail -n 10 -f texto | grep "1" | grep "1"
esto no devuelve nada hasta que lleguen mas datos al fichero

Si el stdout de grep va a un pipe, la salida no es line buffered, y solo enviará datos cada X bytes (mirar grep.md)
tail -f file | grep --line-buffered my_pattern | grep otro



# Tail a fichero comprimido
tail -f fichero | gzip -vc > fichero.gz
gzip irá agrupando para enviar a comprimir, por lo que puede que no veamos datos en fichero.gz hasta pasadas muchas líneas.
Si queremos terminar y que escriba los datos, enviar un kill a tail.
Con control+c saldrá sin escribir al fichero.
