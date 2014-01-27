Hacer una petición GET a /:
curl host:puerto


Hacer un post con datos:
curl -XPUT host:puerto -d '
datos
'
  -d: envia esos datos al servidor. Si no se indica nada, se hace como POST

curl -L http://web.com/mensaje300.html
  -L: si la web nos redirecciona, sigue dicha redirección.


Cookies
curl -b "NAME1=VALUE1; NAME2=VALUE2"

Las cookies podemos sacarlas de Chrome con:
  Boton derecho -> Inspeccionar elemento -> Resources -> Cookies


curl -Ns http://www.climagic\.org/uxmas/[1-12] 
# curl supports numeric ranges. This is the full 12 days of unix-mas from last year
