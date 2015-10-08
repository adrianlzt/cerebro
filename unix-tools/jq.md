http://stedolan.github.io/jq/ 

Test online:
https://jqplay.org/

pacman -S jq

cat fichero.json | jq '.key'


jq '.parent' fichero.json

jq '.data[]._id' /tmp/incidencias
nos da todos los ids del array data


jq -r '.data[] | {id: .eid, status: .status, subject: .contact.subject}' /tmp/incidencias
un array con un monton de valores, simplificarlo para solo tener un monton de diccionarios con unos pocos valores


Borrar
del(.[].foo,.[].bar)
input: [{"foo": 42, "bar": 9001, "baz": 42},{"foo": 42, "bar": 9001, "baz": 42}]
output: [{"baz":42},{"baz":42}]


Indices
Localizar un elemento en un array:
  jq 'indices(1)'
  Input[0,1,2,1,3,1,4]
  Output[1,3,5]
