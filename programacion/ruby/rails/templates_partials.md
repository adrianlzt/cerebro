Podemos crear views reutilizables, se llaman partials.
Por ejemplo podemos crear una vista de un formulario, que servirá tanto para un nuevo elemento como para editar uno existente.

Empiezan por "_"

Si tenemos por ejemplo "_parte.html.erb" para usarlo en otro .erb haremos:
<%= render 'parte' %>

También podríamos usar
<%= render zombie %>
Que miraría la clase, Zombie, y buscaría el partial por defecto "_zombie.html.erb"

# Bucles
<div id="zombies">
  <%= render @zombies %>
</div>

Va a buscar el partial por defecto, _zombies.html.erb, y lo va a reutilizar una vez por cada elemento de la variable 'zombies'.
