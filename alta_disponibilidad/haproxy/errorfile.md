http://cbonte.github.io/haproxy-dconv/1.9/configuration.html#errorfile

Podemos modificar los errores que devuelve haproxy para poner nuestro contenido.

errorfile 400 /etc/haproxy/errorfiles/400badreq.http

Eso por ejemplo hará que si haproxy iba a retornar un error 400, se retorne el contenido del fichero.

El fichero tendrá que tener la estructura de una respuesta http.
Ejemplo:

HTTP/1.0 200 OK
Cache-Control: no-cache
Connection: close
Content-Type: text/plain

some text

