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
