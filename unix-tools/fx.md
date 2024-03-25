https://fx.wtf/

Parecido a jq, pero con un entorno interactivo que nos ayudar a explorar los datos de una forma más visual.

cat file.json | fx
fx file.json

"?" para mostrar la ayuda de key bindings

Según navegamos nos va poniendo el path de jq para acceder al dato.

Si estamos en un dict o lista, podemos dar a la flecha izquierda para comprimirlo.

Si tenemos muchos datos es útil empezar con un collapse all.
E

Podemos pulsar "." para modificar el path de jq.
Hace un poco de autocompletado.

"/" para buscar
n: next
N: previous

Podemos usar regexp
/[a-z]/i

Para mostrar el valor seleccionado
p

Para sacar el valor en stdout y terminar el programa
P


https://fx.wtf/advanced-usage#advanced-usage
También soporta modo comando
echo '{"name": "world"}' | fx 'x => x.name' 'x => `Hello, ${x}!`'



# Non json data
https://fx.wtf/advanced-usage#non-json-data
ls | fx -rs '.filter(x => x.includes(".md"))'

