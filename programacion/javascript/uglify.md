Di queremos "desuglified" un código javascript.
Parece que el código generado no es siempre compilable.
Creo que jsnice es la mejor.
A veces ayudar splitear el texto en varias líneas para poder pasarlo y encontrar posibles problemas.
Pero al splitear, por ejemplo, por "{", podemos hacer split en medio de cadenas de texto y el linter se quejará, por lo que tendremos que arreglarlo a mano.


http://jsnice.org/
web para hacer ese desuglified.

Si queremos una cli, aunque sigue llamando al servicio web:
npm install -g jsnice

Si hay algún fallo de sintaxis, no dice donde, por lo que es muy complicado encontrar el problema.


https://unminify.com/
  con ficheros grandes se queda pillado
https://www.htmlstrip.com/unminify-javascript
  rápido, pero tampoco me generaba un código 100% compatible


Otra opción:
npm install uglify-js -g
Con un fichero grande se quedaba pillado haciendo el beautify



https://prettydiff.com/?m=beautify
Esta funciona muy bien, y tiene un npm

npm i -g prettydiff

prettydiff beautify source:main.47001646875adb2a6409.js > main.unminify.js

El código generado no es complétamente el mismo.
Tras hacer beautify y luefo minify queda algo distinto, con una sintaxis incorrecta (probado en una app android hecha con Cordova)
Con jsnice si me funcionó bien.
