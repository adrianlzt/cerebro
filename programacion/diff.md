http://meldmerge.org/

meld is a visual diff and merge tool targeted at developers. I use to compare config files too.


Para patches:
programacion/parches_diff_patch.md


Usar subshell para comparar
diff -B <( sort A | tr [:lower:] [:upper:] ) <( sort B | tr [:lower:] [:upper:] )
