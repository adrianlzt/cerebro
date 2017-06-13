mv -v fichero.{old,new}
  mueve el fichero.old a fichero.new
  -v verbose, «prueba.old» -> «prueba.new»

mv -n
  no sobreescribir si ya existia el fichero

mv -b a b
 si b existe se hace: mv b b~; mv a b
 podemos cambiar el sufijo con "-S"
 solo nos guarda un backup

mv --backup=n a b
  hace un backup numerado (no podemos modificar el prefix)
  b.~1~, luego b.~2~, etc

mv -T dir/ file1 file2 file3
  para poner primero el directorio destino

mv -u file1 file2
  solo mueve si file1 es más nuevo o si file2 no existe

mv -T dir1 dir2
  sustituye dir2 con dir1 (solo si dir2 está vacío)
