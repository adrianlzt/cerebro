time es un built-in de bash

Para ejecutar el comando GNU
/usr/bin/time -v CMD

  -v: toda la info disponible

/usr/bin/time -ao metrica -f "pwd: %e" pwd
  -a append
  -o escribe el fichero metrica
  -f "pwd: %e" formato de la cadena output


# Arch
pacman -S time


