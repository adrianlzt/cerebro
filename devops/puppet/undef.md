http://docs.puppetlabs.com/guides/templating.html#testing-for-undefined-variables

Problema grave y conocido en puppet.



$contactgroups = ''
if $contactgroups <- FALSE
$prueba = inline_template("<% if @contactgroups %> defined <% end %>") <- TRUE

Si usamos la variable $contactgroups en un defined type, por ejemplo, la usará como cáracter vacío. 
En cambio si estuviese como undef, ese parámetro no se tendría en cuenta.
