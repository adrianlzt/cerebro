Eliminar nuevas líneas:
tr -d '\n'

Ejemplo:
$ date +%s | tr -d '\n'
1379933110$

$ date +%s | tr  '\n' ' '
1379933110 $


Borrar los paréntesis y mayúsculas:
tr -d '[A-Z]()'
