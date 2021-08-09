http://meldmerge.org/

meld is a visual diff and merge tool targeted at developers. I use to compare config files too.

Para la consola podemos usar: delta
Outut parecido al de meld (pero sin posibilidad de modificar).
Podemos usar tambien vim: vim -d foo bar


Para patches:
programacion/parches_diff_patch.md


Usar subshell para comparar
diff -B <( sort A | tr [:lower:] [:upper:] ) <( sort B | tr [:lower:] [:upper:] )


Comparar ficheros binarios
vbindiff


comm
comparar ficheros linea por línea. Deben estar ordenados

comm -3 fichero1 fichero2
retorna las lineas distintas

comm -2 -3 file1 file2
líneas únicas en file1

comm -1 -3 file1 file2
líneas únicas en file2
