Otros comandos lsxxx utiles
http://www.cyberciti.biz/open-source/command-line-hacks/linux-ls-commands-examples/


ls -lahSr
ordear por tamaño (-S) más grandes al final

ls -l --time-style=+%Y-%m-%d:%H:%M:%S
Formato específico para la fecha


ls -alQ
Entrecomilla los nombres, así podríamos ver si tenemos algún caracter en blanco después del nombre


ls -1t
Ordenar por orden de más nuevo a más antiguo, solo el nombre del fichero.


Orden de todos los ficheros en este directorio y subdirectorios:
ls -lart $(find . -type f)


ls
ls -l ## long format 
ls -F ## appends a character revealing the nature of a file
ls -a ## Show all files including hidden files
ls -R ## recursively lists subdirectories
ls -d ## Get info about a symbolic link or directory
ls -t ## Sort the list of files by modification time
ls -h ## Show sizes in human readable format
ls -B ## In directories, ignore files that end with ‘~’ (backup files)
ls -Z ## Display the SELinux security context
ls --group-directories-first -l ## Show directories first (group directories). Useful on server.
ls --color ##  Colorize the ls output 
ls --hide='*.txt' -l ## Hide or  ignore files whose names ends with .txt


ls *
  la shell expande el asterisco a los ficheros y directorios que tengamos en el directorio actual
  es equivalente a hacer: ls dir1/ dir2/ file1 file2 
  no se muestran los ficheros ni los dir que empiecen por "."
  lo que conseguiremos es un ls de los ficheros de nuestro directorio actual, más un ls de los ficheros de primer nivel
  si no hay ningún fichero: zsh: no matches found: *
  si hay demasiados ficheros (con 60000 aun no lo he conseguido) saltaría: too many files

# ACL
Si un fichero tienen definido ACL, al hacer 'ls -la' tendrá un '+' al final de la definición de los permisos.
