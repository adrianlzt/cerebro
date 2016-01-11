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

