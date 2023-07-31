split -b 1G verylargefile split
  Split a file called largefile into 1 gigabyte pieces called split-xaa, split-xab, split-xac

split -l 4 file
  divide file en ficheros de 4 lineas

split -n l/10 file
  didir el fichero en 10, sin cortar líneas

csplit
como split pero permite regex

Partir un fichero cada vez que encuentre una expresión regular, en tantos cachos como sea posible (ficheros xxNNN):
csplit -n 3 skydive_fatal_trace.txt /goroutine/ '{*}'

Partir un fichero log de postgres, formato csv, por "^2023", que es el comienzo de las líneas.
Lo partimos en ficheros de 5M de líneas. No fallar si no hay suficienes líneas (-k).
csplit -k postgresql.csv-2023-07-29-03 /^2023/5000000 '{*}'

No funcionó del todo bien. En la primera línea de algunos ficheros seguía teniendo líneas a medias.
