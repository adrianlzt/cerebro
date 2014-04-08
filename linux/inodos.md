http://stackoverflow.com/questions/347620/where-are-all-my-inodes-being-used

Buscar que directorios consumen más inodos:
for i in `find . -type d `; do echo `ls -a $i | wc -l` $i; done | sort -n
