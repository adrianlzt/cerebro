echo "zzzz" > a
cp -l a b
ln a c
ls -lai
1145375 -rw-r--r--  3 adrian adrian   5 nov  6 11:31 a
1145375 -rw-r--r--  3 adrian adrian   5 nov  6 11:31 b
1145375 -rw-r--r--  3 adrian adrian   5 nov  6 11:31 c

Todos con el mismo inodo
Y nos marca que hay 3 ficheros hard linked.



http://earlruby.org/2013/05/creating-differential-backups-with-hard-links-and-rsync/


Buscar hardlinks de un fichero
find . -samefile fichero

Buscar ficheros que tengan hard links (y sean ficheros normales)
find . -links +1 -type f
