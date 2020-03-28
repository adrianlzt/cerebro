http://stackoverflow.com/questions/347620/where-are-all-my-inodes-being-used

sudo du -x --inodes -d 1 /etc | sort -hr | uniq | head -20
los 20 directorios con más ficheros.
Incluyendo también la cuenta de /etc
El problema de este comando es que puede tardar mucho sobre directorios muy grandes

timeout -v 10s find /usr -xdev -maxdepth 1 -mindepth 1 -exec sh -c "echo {}; timeout -v 3s du --inodes -x -d 0 {} 2>&1" \; | paste -d " " - - | sort -rn -k 2 | { (sed -u 10q | awk '{print $1" "$2;}' ) ; grep timeout; }
Con este comando analizamos solo el primer nivel de directorios debajo de /var (sin /var)
Solo permitimos correr a "du" 3s por cada directorio.
Y luego seteamos un timeout global de 10s
De esta manera nos aseguramos que el comando no tarde más de 10s en global.
Y que si algún dir tiene muchos ficheros, saltará el timeout de "du" y lo veremos, indicando que en ese path hay muchos ficheros.
Si necesitamos poner sudo, ponerlo tanto para find como para du.
Si el "top 10" saca algún timeout, será cortado por el awk, no importante.


Buscar que directorios consumen más inodos:
find /home -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n
  lo malo de este comando es que no sumariza, no puedes ver que /home/pepe es el que mas ficheros tiene

Número total de ficheros agrupados por directorio:
for i in *; do echo -e "$(find $i | wc -l)\t$i"; done | sort -n
find / -mindepth 1 -maxdepth 1 -printf "echo -n '%p: '; find %p | wc -l\n" | sh | sort -n -k 2 | awk '{print $0; SUM += $2;} END {print "Total:", SUM}'



Ver como está el consumo de inodos por fs
df -i
