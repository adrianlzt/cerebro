http://guides.rubyonrails.org/asset_pipeline.html

En rails 3.1 se han separado los directorios de stylesheets, javascripts e images en tres:
app/assets <- specific app code
lib/assets <- My Shared code (shared across different projects)
vendor/assets <- 3rd Party code (por ejemplo js para hacer un slideshow)

Para acceder a todos los elementos que podemos tener en estos 3*3 directorios usaremos:
/assets/blabla.js
/assets/image.png
...

Para meterlo en el código:
<%= javascript_include_tag "custom" %>  -> <script src="/assets/custom.js" ...
<%= stylesheet_link_tag "custom" %>  -> <link href="/assets/style.css" ...
<%= image_tag "dog.png" %>  -> <img src="/assets/dog.png"...
  En producción nos generará un src tipo "/assets/dog-afnsdvni5745980.png" que cambiará cuando se modifique el fichero.
  Esta funcionalidad se usa para el cacheo, así las imágenes que no cambien se podrán mantener cacheadas siempre.

Para usar esto en CSS usamos plantillas (mas en scss.md)
app/assets/stylesheets/zombie.css.erb
background-image: url(<%= asset_path('button.png') %>); <- de esta manera se generará un link tipop /assets/button-a7fgh834hsd.png

IMPORTANTE:
asegurarse que el directorio assets y los ficheros tienen permiso de lectura++ejecucción para others.


## JavaScript##
Las librerias javascript se cargan con:
app/views/layouts/application.html.erb
<%= javascript_include_tag "application", "data-turbolinks-track" => true %>
Ver sprockets.md

Esto también se encargará de generar el link tipo "application-asdoas8di97utg.js" para usar caching correctamente.


## CSS ##
De la misma manera que hacemos con los sprockets en javascript, también tenemos includes en css.
application.css se encargará de hacer estos includes:

app/views/layouts/application.html.erb:
<%= stylesheet_link_tag    "application", media: "all", "data-turbolinks-track" => true %>
También hará uso correcto del caching

applications.css
 *= require_self  <- Carga el css que esté en applications.css
 *= require_tree . <- Carga el resto de .css del directorio

<%= asset_path("cosa") %> <- para meter dentro de los css y que genere /assets/cosa-342o5h8wfois


## Precompilar código ##
Si queremos "compilar" el coffee script, y reducir el tamaño de los css y js haremos:
rake assets:precompile

Si no, se hará con la primera petición (creo)
