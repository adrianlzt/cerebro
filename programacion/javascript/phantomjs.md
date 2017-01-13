http://phantomjs.org/

Lo entiendo como un javascript que simular ser un navegador y puede renderizar una web correctamente.

# Usos
Testear websites sin un navegador
Hacer capturas de pantalla
Acceder y manipular páginas (meter elementos de css, de html, etc)
Monitorizar tiempos de carga


# Install
npm install phantomjs


# Render / Ejemplo captura web
http://phantomjs.org/screen-capture.html

Super simple:
var page = require('webpage').create();
page.open('http://example.com/', function() {
  page.render('example.png');
  phantom.exit();
});

wget https://raw.githubusercontent.com/ariya/phantomjs/master/examples/rasterize.js
node_modules/phantomjs/bin/phantomjs rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]


node_modules/phantomjs/bin/phantomjs rasterize.js https://github.com/parvez/snapshot/blob/c6a22faf8b7e9f34f8d24ccb03f609280419ef21/app/helper_generate.js github.pdf
Captura toda esa web de github en un único png sin cortes


# Modificar web
http://phantomjs.org/page-automation.html

var page = require('webpage').create();
page.open('http://example.com/', function() {
  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    page.evaluate(function() {
      $("h1")[0].innerHTML = "jugando con jquery";
    });
    page.render('example.png');
    phantom.exit();
  });
});



# Debug
http://phantomjs.org/troubleshooting.html

phantomjs --remote-debugger-port=9000 test.js

Entrar en http://localhost:9000

Pinchar sobre el link que aparece (yo veo el nombre del script)
Activar el debug
Poner algun breakpoint
Abrir la consola y poner "run()"

No me termina de funcionar bien.
