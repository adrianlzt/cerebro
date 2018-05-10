$(this).prev("input[type=hidden]")
$(this).parents(".hostgroup_field")

Buscar por contenido (imprimible en pantalla?)
$('.hostgroup_field').find(":contains('nuevo')")[1].

Buscar por href
$('a[href="/services/form"]')


Para mirar lo que se puede meter dentro de find(), parents(), etc, mirar selector.md


Buscar dentro del elemento con id=nueva_prueba_form un input que tenga 'name' dentro de su nombre.
$("#nueva_prueba_form").find("input[name*='name']")

Padres del elemento
$("elemento").parents()

Padre del elemento
$("elemento").parent()

Elementos de la misma jerarquía (hermanos)
$("elemento").siblings()

Hijos del elemento
$("elemento").children()

$(".hostgroup_field").children('.check_list_hostgroup').siblings()

Busca en toda la descendencia de elemento la clase "miclase"
$("elemento").find(".miclase")
