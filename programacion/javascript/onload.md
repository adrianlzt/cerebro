mirar events.md para entender cuando se ejecuta onload y cuando otros eventos.

window.onload = function() {
  init();
  doSomethingElse();
};


Tipica función javascript para hacer algo en la carga de la web
jQuery(document).ready(function($) {
});

Escrito en coffee
$(document).ready ->


Si usamos turbolinks esto no funciona a no ser que recarguemos, por lo que usaremos:
$(document).on('ready page:load', function() {
  ...
});

Escrito en coffee
$(document).on 'ready page:load', ->
