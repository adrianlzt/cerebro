Hacer una petición GET a /:
curl host:puerto


Hacer un PUT con datos:
curl -XPUT host:puerto -d '
datos
'
  -d: envia esos datos al servidor


Post de un fichero binario:
curl -H "Content-Type: application/zip" --data-binary @build/mac/package.zip "https://uploads.github.com/repos/hubot/singularity/releases/123/assets?name=1.0.0-mac.zip"

Hacer un POST de un JSON
curl -XPOST https://api.bintray.com/packages/adrianlzt/rpm -H "Content-Type: application/json" -d '
{
"name": "my-package",
"desc": "To be used with https://github.com/adrianlzt/puppet-monitoring",
"labels": ["puppet-monitoring"],
"licenses": ["Public Domain"],
}'


curl -L http://web.com/mensaje300.html
  -L: si la web nos redirecciona, sigue dicha redirección.


Cookies
curl -b "NAME1=VALUE1; NAME2=VALUE2"

Las cookies podemos sacarlas de Chrome con:
  Boton derecho -> Inspeccionar elemento -> Resources -> Cookies


curl -Ns http://www.climagic\.org/uxmas/[1-12] 
# curl supports numeric ranges. This is the full 12 days of unix-mas from last year


A través de proxy
curl --proxy http://proxy.com:6666 http://www.google.es


Autenticatión, HTTP basic:
curl -u user:pass http://web.com
