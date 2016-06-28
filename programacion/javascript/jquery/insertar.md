
Inserta dentro del <div class='hostgroup_field'> al final el html <p>asdas</p>
$('.hostgroup_field').append("<p>asdas</p>")


http://api.jquery.com/category/manipulation/dom-insertion-outside/

.after()
.before()
$(elemento).after/before.("lo que quiero añadir")

.insertAfter()
.insertBefore()
$("lo que quiero añadir").insertAfter/Before(".claseDondeInserto")


Cambia todo, includo el <div id="blabla">
.replaceWith("#blabla")

Cambia solo el contenido:
.html("cosas")


$("coso").append("mas texto");
