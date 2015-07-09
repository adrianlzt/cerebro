La web nos proporciona una facilidad para hacer extracciones de campos.
Ponemos unos ejemplos de lo que queremos y el se inventa una regexp para hacer match a esos.
Si nos gusta, lo guardamos con un nombre y ese campo lo almacenará en la configuración particular de la app (en los searchers).
apps/X/local/props.conf
[ardi]
EXTRACT-verbo = (?i)\-xx(?P<verbo>[^/]+)

Una vez creada la extracción de campos podemos decidir a quien queremos dar permisos de ver esa extracción.

