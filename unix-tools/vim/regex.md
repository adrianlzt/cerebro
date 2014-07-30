http://vim.wikia.com/wiki/Search_and_replace

En todas las lineas, busca una linea que solo tenga el caracter r, y borrala ('d').
g/ es para get. Coge las lineas de este match y haz tal cosa
%g/^r$/d

Cambia los cambios de linea por '\n'
:%s/\n/\\n/

Cambia los '$' por '\$':
:%s/\$/\\\$/g

Cambiar uno o mas espacios en blanco por uno solo:
:%s/\s\+/ /

Cambia la letra a por un cambio de línea:
%s/a/\r/g

Busca [a-z]: LoQueSea, y borra de los dos puntos para adelante (\1 me copia lo que puse entre paréntesis)
s/\([a-z]+\)*: .*/\1/

Para capitalizar (primera mayúscula resto minúsculas) \u
Todas en mayúsculas \U

Cambia un trozo del texto a lowercase
:s/hostgroup_name  \([a-zA-Z\-\_]*\)$/hostgroup_name  \L\1/
hostgroup_name  dSN-VCENTER -> hostgroup_name  dsn-vcenter

Cambio entre las lineas 153 y 173 (incluídas)
:153,173s/\([a-z_]*$\)/\1] = sf[:\1]
st[:check_id  --->>> st[:check_id] = sf[:check_id]

Borra lineas entre 25 y 30 (incluídas)
:25,30d


Inserta un cambio de línea antes de '(', ',' o ')'
/[(,)]
:s//\r&/g
  Primero se realiza la búsqueda.
  Luego se aplica la substitución a lo encontrado por la búsqueda.
  Se pone un cambio de línea (\r) y luego el resultado de la búsqueda (&)
  Se hace todas las veces que haga falta por línea (\g)


:%s/XXX/ABC/g
Cambia en todo el fichero las apariciones de XXX por ABC (incluso si hay varias en una línea)

Quitar “Control+M” de los finales de línea (^M):
:%s/^V^M//g
El ^V, es pulsar control+v, entonces nos aparecerá el caracter ^, y tendremos que escribir control+m


:%s/blabla/tete/g
Cambia en todo el fichero, todas las ocurrencias de blabla por tete

:.,+2s/blabla/tete/g
Cambia en esta línea y las dos siguientes...

:.,$s/bla/tete/
Cambia desde esta línea hasta el final del fichero [ranges]
