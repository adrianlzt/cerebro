Eliminar nuevas líneas:
tr -d '\n'

Ejemplo:
$ date +%s | tr -d '\n'
1379933110$

$ date +%s | tr  '\n' ' '
1379933110 $


Borrar los paréntesis y mayúsculas:
tr -d '[A-Z]()'

Pasar de minúsculas a mayúsculas
echo "qwert" | tr [:lower:] [:upper:]

Pasar de mayúsculas a minúsculas 
echo "qwert" | tr [:upper:] [:lower:]

Borrar minúsculas
echo "qwEeBrNt" | tr -d [:lower:]
  EBN
