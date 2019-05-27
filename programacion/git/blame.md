http://git-scm.com/docs/git-blame

Show what revision and author last modified each line of a file

git blame -L 10,20 file.txt
  Mira a ver quien ha modificado las líneas de la 10 a la 20 del fichero file.txt
  -l para poner el sha1 largo



Buscar una linea en los diff de los commits:
git log -p -S <string> path/to/file

Con regexp:
git log -p -G '<regexp>' path/to/file
