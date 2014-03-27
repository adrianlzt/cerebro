AJAX: hacer acciones enviando información al servidor y modificando la web sin tener que volverla a cargar.

## Ejemplo, borrar una fila de una tabla cuando pinchemos a un link. ##
1.- el link genera una llamada remota al server
2.- el router acepta la llamada javascript
3.- se manda de vuelta el javascript al cliente que produce el efecto

Para habilitar un link que envíe una RPC
<%= link_to 'delete', zombie, method: :delete, remote: true %>
  Genera <a href="/zombies/5" data-method="delete" data-remote="true" rel="nofollow">delete</a>

Ahora deberemos habilitar en el controlador aceptar peticiones javascript:
def destroy
  respond_to do |format|
    ...
    format.js
  end
end

Y ahora creamos una vista para responder a esa llamada
app/views/zombies/destroy.js.erb
$('#<%= dom_id(@zombie) %>').fadeOut();

Para que funcione en el template generado por defecto, deberemos poner el row de cada elemento con el id correspondiente:
index.html.erb:
<tr id=<%= dom_id(zombie)%>>



## Añadir formulario en la web de index, y agregar automáticamente los nuevos elementos: ##

En el controlador añadiremos:
def create
  ...
  repond_to do |format|
    ...
    format.js
  end
end

En el index meteremos el formulario:
Mejor, copiamos el partial _form a _formjs y modificamos la primera línea:
<%= form_for(Zombie.new, remote: true) do |f| %>

Y quitaremos el if para mostrar errores que hace uso de la variale @zombie, ya que en el index no tenemos ninguna variable así (tenemos todos los zombies en @zombies).

Crearemos la respuesta ajax:
$('tbody').append("Name: <%= @zombie.name %>")
Esto insertará al final de <tbody> "Name: nombrezombienuevo"
Para hacerlo mejor deberíamos crear un partial de como imprimir un zombie y hacer:
$('tbody').append("<%= escape_javascript(render @zombie) %>")

Podríamos remarcar también la nueva aparición
$("#<%= dom_id(@zombie) %>").effect('highlight');


Para terminar, podríamos añadir un remarcado del formulario en el caso de que no se pueda completar la creación del objeto.
Todo junto sería
<% if @zombie.new_record? %> <- true quiere decir que no se ha creado el objeto
  $('input#zombie_name').effect('highlight', {color: 'red' });
<% else %>
  $('tbody').append("<%= escape_javascript(render @zombie) %>")
  $("#<%= dom_id(@zombie) %>").effect('highlight');
<% end %>

Para poder usar el efecto de highlight tenemos que añadir la librería ui de jquery.
En applications.js
//= require jquery_ui



## Meter un valor modificable en el show del elemento ##
Como estamos actualizando un elemento ya existente, haremos uso de "put".

Creamos una nueva ruta:
resource :zombies do
  ...
  put :custom_var, on: :member
end

Definimos el formulario dentro de show.html.erb
<span id="var"><%= @zombie.var %></span> <- lo usaremos para mostrar el valor
<div id="custom"> <- lo usaremos para luego quitar el form
<%= form_for @zombie, url: custom_var_zombie_path(@weapon), remote: true do |f| %>
<%= f.text_field :var %>
<%= f.submit "Set" %>
<% end %>
</div>

Definimos la nueva función en el controller
def custom_var
  @zombie = Zombie.fin...
  @zombie.var = params[:zombie][:decomp]
  @zombie.save
end <- no have falta definir el respond_to ya que solo vamos a reponder a js

Creamos la vista javascript. Irá cambiando el valor de span, y si el valor que metemos es igual a "cosa", ocultará el formulario
views/custom_var.js.erb
$('#decomp').text('<%= @zombie.var %>').effect('highlight',{},3000);
<% if @zombie.var == "cosa" %>
  $('div#custom_var').dateOut();
<% end %>



## Comunicar cliente y servidor mediante una API JSON, usando en el lado cliente código javascript ##
mirar ajax.md 

1.- Definir el formulario para el usuario que usará js para enviar json al server
2.- Escribir la función que recibirá ese json
3.- Escribir el js con coffeescript que usará el cliente

El formulario será como el del caso anterior, únicamente que ahora no pondremos el remote: true

En el controler definimos el responder para json
respond_to do |format|
  ...
 format.json { render json: @zombie.to_json(only: :decomp) }
end

Para no devolver nada: format.json { render json: {} }


Ahora escribimos el código javascript que se va a ejecutar en el cliente (irá cargado junto con la página)
app/assets/javascripts/zombies.js.coffee
$(document).ready ->
  $('div#custom_phase2 form').submit (event) ->       <--- Este es el nuevo formulario que hemos creado. Cuando le demos a submit ejecutará...
    event.preventDefault()                            <--- Evitamos que se haga un post
    url = $(this).attr('action')
    custom_decomp = $('div#custom_phase2 #zombie_decomp').val()

    $.ajax
      type: 'put'
      url: url
      data: { zombie: { decomp: custom_decomp } }  <- metemos plain json
      dataType: 'json'
      success: (json) ->
        $('#decomp').text(json.decomp).effect('highlight') <- añadimos valor nuevo y lo resaltamos
	$('div#custom_phase2').fadeOut() if json.decomp== "Cosa" <- escondemos formulario si el valor es "Cosa"

Ejecutar algo cuando se pinche sobre un enlace (y que el enlace no nos lleve a ningún lado)
$(document).on 'click', '#delete_hostgroup', (event) ->
  event.preventDefault()
  ...javascript de lo que queramos hacer...


# Devuelve un json cuando hacemos click

$(document).on 'click', '#add_bulk', (event) ->
  event.preventDefault()
  bulk_id = $(this).next('#bulk_id').val()
  url = "/bulks/"

  $.ajax
    type: 'get'
    url: url+bulk_id+".json"
    success: (json) ->
      alert("fin")

Si queremos pasar al GET valores tipo ?var=valor
data: {
        code: $('#user_id').val()
      },



## Turbolinks ##
A partir de Rails 4 donde va incluído por defecto Turbolink tenemos que usar
  $(document).on 'ready page:load', ->
en vez de
  $(document).ready ->
