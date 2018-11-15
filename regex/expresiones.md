4 caracters alfabéticos en minúsculas
[a-z]{4}


\d digito
  tambien floats
\D cualquier cosa que no sea un digito
\s espacio en blanco, tabs, cambios de linea
\S cualquier cosa que no sea nada de lo anterior
\t tabulador

\s? a lo mejor hay un espacio, a lo mejor no
([a-z]*)\? a lo mejor está ese capturing group, a lo mejor no

...
Mirar en la columna de la derecha de http://regexr.com/ para ver todas las opciones y su explicación


[^aeiou]
Coger cualquier cosa que no sea a,e,i,o,u


ungreedy
Hacer lazy matching.
En vez de que ".*" intente coger el máximo, hacer que coja poco
