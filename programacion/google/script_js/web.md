https://developers.google.com/apps-script/guides/web
https://developers.google.com/apps-script/guides/html/

Devolver contenido:
https://developers.google.com/apps-script/reference/content/
https://developers.google.com/apps-script/reference/html/

# Hello world
function doGet() {
  return ContentService.createTextOutput('Hello, world!');
}

Publicar -> Implementar como aplicación web

Nos dará una URL pública que cuando la llamemos nos devolverá el hello.

Al publicar una app también tenemos disponible un endpoint con la última versión:
Verifica la aplicación web para el último código.


# HTML
return HtmlService.createHtmlOutput('<b>Hello, world!</b>');


# Comunicación JS cliente (navegador) con el server
https://developers.google.com/apps-script/guides/html/communication

En el HTML que servimos al cliente podemos meter llamadas a funciones de nuestra app.
google.script.run.doSomething();


# Parametros
doGet(e)
doPost(e)

Parámetros de un get: e.parameter


# Respuestas
Si el return es un HtmlService la web se mostrará directamente, pero con un frame de google arriba.

Si usamos ContentService, la web mostrará únicamente lo que pongamos y podremos poner MimeType JSON, XML, etc. Lo malo es que tendremos que saltar un redirect.
Con curl:
curl -L https://script.google.com/macros/s/cT2p1elGgty/exec

# JSON
mirar json.md
Ejemplo de server web que acepta json y contesta json


# Definir titulo y el tipo de sandbox
function doGet() {
  //return HtmlService.createTemplateFromFile('mapa').evaluate();

  var template = HtmlService
                 .createTemplateFromFile('mapa');

  var htmlOutput = template.evaluate()
                   .setSandboxMode(HtmlService.SandboxMode.NATIVE)
                   .setTitle('jQuery UI Dialog - Modal form');

  return htmlOutput;
}
