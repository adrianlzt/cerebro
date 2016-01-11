ln -s src link
  symlink (puntero)

ln src link
  hard link (dos ficheros con distinto nombre apuntando al mismo inodo)

ln -v ...
  nos da en la salida que ha hecho


# Directorios
Para modificar un link a un directorio tenemos que pasar las opciones:
-f: force
-n: --no-dereference treat LINK_NAME as a normal file if it is a symbolic link to a directory

$ mkdir dir1 dir2
$ ln -s dir1 link
$ ls -l link
lrwxrwxrwx 1 adrian adrian 4 nov  6 14:31 link -> dir1
$ ln -sfn dir2 link
$ ls -l link
lrwxrwxrwx 1 adrian adrian 4 nov  6 14:31 link -> dir2

