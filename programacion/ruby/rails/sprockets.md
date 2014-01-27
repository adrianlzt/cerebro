https://github.com/sstephenson/sprockets#sprockets-directives

Se usan como "includes" para javascript.
El orden en que lo pongamos será como se ponga en la página.

El fichero "applications.js" que se genera automáticamente cuando creamos la aplicación tendrá estos includes hacia las librerias js que vienen por defecto.
//= require jquery <- jQuery framework
//= require jquery_ujs <- rails specific unobstrusive JavaScript (formuarlios, put/delete, etc)
//= require turbolinks <- Turbolinks makes following links in your web application faster 

También incluirá por defecto todos lo js bajo app/assets/javascripts con:
//= require_tree .

Para incluir código de otros directorios:
lib/assets/javascripts/shared.js.coffee
vendor/assets/javascripts/friend.js
//= require shared
//= require friend
