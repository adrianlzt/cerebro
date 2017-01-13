http://stackoverflow.com/questions/347620/where-are-all-my-inodes-being-used

Buscar que directorios consumen más inodos:
find /home -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n
  lo malo de este comando es que no sumariza, no puedes ver que /home/pepe es el que mas ficheros tiene

Número total de ficheros agrupados por directorio:
for i in *; do echo -e "$(find $i | wc -l)\t$i"; done | sort -n
find /home -mindepth 1 -maxdepth 1 -printf "echo -n '%p: '; find %p | wc -l\n" | sh | sort -n -k 2 | awk '{print $0; SUM += $2;} END {print "Total:", SUM}'



Ver como está el consumo de inodos por fs
df -i
