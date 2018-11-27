cp -v fichero.{old,new}
  copia el fichero.old a fichero.new
  -v verbose, «prueba.old» -> «prueba.new»

Usar siempre está opcion en vez de -pr. Nos conserva todo lo que pueda y ya lleva el recursivo (deja lo sysmlinks como estén)
Esta nos preserva también 
cp -a
  -a, --archive, -dR --preserve=all
     --no-dereference
       never follow symbolic links in SOURCE
     -R
       copy directories recursively
     --preserve=all
       preserve  the  specified  attributes (default: mode,ownership,timestamps) if possible additional attributes: context, links, xattr, all


cp -l
  hace hardlink en vez de copiar
  mucho más rápido


  $ du -hsc datos/
  236M    datos/

  $ time cp -a datos/ bak1
  real    0m2.880s
  user    0m0.300s
  sys     0m2.417s

  $ time cp -al datos/ bak2
  real    0m0.799s
  user    0m0.067s
  sys     0m0.683s


Cambiar un hard link por una copia normal (borra el destino antes de la copia)
cp --remove-destination file1 file2



Copiar el contenido de un directorio en otro dir:
cp -r /mnt/. /app/

Si hacemos: cp -r /mnt/ /app/, acabaremos con /mnt/app/ficheros


cp -b fichero destino
  -b --backup
  si "dest" ya existe, lo mueve a ~dest

  con --backup=numbered generaremos un segundo fichero de backup si el primero ya existe
  --backup=existing backup con numeros si ya existe un backup, simple (solo poner el suffix) si no existe backup

  Podemos cambiar el suffix por defecto (~) con lo que queramos, por ejemplo:
  cp -b --suffix=$(date +%Y%m%d) orig dest
