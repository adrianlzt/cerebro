Crear tgz
tar zcvf comprimido.tgz dir1/ dir2/ fiche1 fiche2

Ver fichero tgz
tar ztvf fichero.tgz

Descomprimir tgz
tar zxvf fichero.tgz -C dir-extraer-en/

Crear tgz
tar jcvf comprimido.tar.bz2 dir1/ dir2/ fiche1 fiche2

Ver fichero tgz
tar jtvf fichero.tar.bz2

Descomprimir .tar.bz2
tar jxvf fichero.tar.bz2


Append / delete (no comprimidos):
tar cvf fichero.tar dir1/
tar rvf fichero.tar dir2/
tar tvf fichero.tar
  dir1/
  dir2/

tar --delete --file fichero.tar dir1
tar tf fichero.tar
  dir2/

Actualizar, crea el tar si no existe (no comprimidos):
tar uvf fichero.tar dir1/
tar uvf fichero.tar file2
tar uvf fichero.tar dir2/
tar tvf fichero.tar
  dir1/
  file2
  dir2/



z: usar gzip
j: usar bzip2


c: crear
t: ver
x: extraer
u: update
r: append
--delete: borrar de un tar

v: verbose, mostrar ficheros

f: fichero donde crear, ver, extraer, ...
