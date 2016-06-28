http://curl.haxx.se/docs/httpscripting.html

Hacer una petición GET a /:
curl host:puerto

Ver todas las cabeceras:
curl -v ...

Ver cabeceras de la respuesta
curl -D - ...

Hacer un POST:
curl -d 'variable=valor&otra=123' http://www.web.com

Fake host:
curl -H 'Host: be.caja-ingenieros.es' https://localhost/....

Hacer un PUT con datos:
curl -XPUT host:puerto -d '
datos
'
  -d: envia esos datos al servidor

Curl GET con urlencode:
curl -G --data-urlencode "GET hosts" httpbin.org/get
  -> http://httpbin.org/get?GET hosts

curl -G --data-urlencode "q=GET services" --data-urlencode "key=description" "http://10.95.83.172/api/query"
  -> http://10.95.83.172/api/query?q=GET%20services&key=description

Post de un fichero binario:
curl -H "Accept: application/json" -H "Content-Type: application/zip" --data-binary @build/mac/package.zip "https://uploads.github.com/repos/hubot/singularity/releases/123/assets?name=1.0.0-mac.zip"

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

--socks5 <host[:port]>

Para resolver dns por el proxy:
--proxy socks5h://
o
--socks5-hostname <host[:port]>



Autenticatión, HTTP basic:
curl -u user:pass http://web.com


# SSL
Si al hacer curl a un https nos da error:
curl: (60) SSL certificate problem: unable to get local issuer certificate
Tendremos que usar --cacert certificado.pem

curl -k ...
para no chequear el certificado

# Enviar datos con base64
CONFIG_BASE64=$(base64 fichero_config.zip)
curl -v -X POST -d '{"config": "${CONFIG_BASE64}"}' -H 'Content-type: application/json' http://localhost:8000/api


# Variable en la data
curl  -X POST --data '{"description":"Created via API","public":"true","files":{"file1.txt":{"content":"'"$FICHERO"'"}}}' https://api.github.com/gists

El tema es que hay que cerrar las simples y meter la variable en dobles:
'esta es una frase '"$variable"' y por aqui sigue'

# Compressed / gzip
si queremos forzar el envio de la cabecera:
Accept-Encoding: deflate, gzip

Podemos poner:
--compress

# Medir tiempo
curl -s -w "Time total: %{time_total}\n" http://localhost:8086/ -o /dev/null

Mirar en la sección de -w para ver que más valores podemos obtener

# timeout
--connect-timeout
--max-time -m

# Gestionar errores
-f
En vez de devovlernos la web del fallo 404, curl falla con una linea de error:
curl: (22) The requested URL returned error: 404 Not Found

-sS silent, y -S hace que se muestren errores si suceden (si no, un 404 no muestra nada)

# Redirect
-L
sigue redirecciones (HTTP 30x)
Si muestra cabeceras, primero mostrará la primera petición y luego la redirección



# HTTP2
yaourt -S aur/curl-http2-git

--http2
       (HTTP) Tells curl to issue its requests using HTTP 2. This requires that the underlying libcurl was built to support it.  (Added  in
       7.33.0)

para saber si tenemos soporte:
curl --version

Hace uso de https://nghttp2.org/
