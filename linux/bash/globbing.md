[0-9] is a form of shell globbing
{0..9} is brace expansion.



cat file[0-2]
nos mostrará los ficheros que existan que se llamen file0, file1 o file2

cat file{0..2}
es equivalente a: cat file0 file1 file2
Esta expansión la hace obligatoriamente, no chequea si existen los ficheros


^a^b
pone el último comando cambiando la primera "a" por una "b".

!!:gs/arm/orn/
cambia todas las apariciones de "arm" por "orn"
