http://coffeescript.org/

CoffeeScript is a little language that compiles into JavaScript. Underneath that awkward Java-esque patina, JavaScript has always had a gorgeous heart. CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way.

Es una especie de código ruby que genera javascript.

Nos puede simplificar la programación con jQuery.

Las librerias javascript se cargan con:
<%= javascript_include_tag "application", "data-turbolinks-track" => true %>
Ver sprockets.md

Esto también se encargará de generar el link tipo "application-asdoas8di97utg.js" para usar caching correctamente.


Los coffee scripts se pueden renombrar a .erb para interpretar ruby.
No todos los helpers están disponibles (por ejemplo los _path de las rutas no lo están) 
Esto es porque no estamos en el 'view context'. http://stackoverflow.com/questions/15053678/rails-path-helpers-doesnt-work-in-js-coffee-erb

Si que hay algunos helpers de asset que están disponibles: http://guides.rubyonrails.org/asset_pipeline.html#coding-links-to-assets
Por ejemplo asset_path


Ejemplo: (otro en ajax.md)
$(document).ready ->
    $('#projects_select').change ->
      $.ajax
        url: "/path/blabla"
        data: { project_id : $('#projects_select').val() }
        dataType: "script"


Ejemplo sencillo definiendo una función:
window.remove_fields = (link) ->
  $('#project_name').val("asda")

Desde la consola del navegador podremos llamar a la funcion remove_fields(var) y cambiará el valor del objeto #project_name.
Para poder usar las funciones de coffeescript en el navegador o en el html tenemos que poner el scope general, por eso pongo delante 'window.'
Más info sobre esto: http://stackoverflow.com/questions/9254253/rails-calling-coffeescript-from-javascript


Ejemplo de ejecutar función cuando se haga click:
$(document).on 'click', '#delete_item', (event) ->
  event.preventDefault()
  alert("hola")


Para referenciar al class fields que tengamos por encima:
  $(this).parents(".fields")

