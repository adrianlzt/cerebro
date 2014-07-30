Gema para tener mejor selects
http://ivaynberg.github.io/select2/

http://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_select

<%= f.select :gustos, ['musica', 'deporte'] %> <- desplegable
<%= f.select :gustos, [['musica',1], ['deporte',2]] %> <- se muestra el texto, pero se postea el valor numerico
<%= f.select :is_volatile, [['Template',''],['True',1],['False',0]] %>

Select múltiple para un elemento que tiene una relación M-N con projects
<%= f.select :project_ids, @projects.map {|p| [p.name, p.id]}, {}, {multiple: true} %>
Es necesario en el controlador modificar el params.require y añadir al final: project_ids: []
  params.require(:host_template).permit(:name, :projec..., notification_options: [])
  Lo que hace es convertir notification_options en un array.
  Para mostrarlo, una opción:
    <strong>Projects:</strong>
    <% @contact.project.each do |pro| %>
      <li><%= pro.name %></li>
    <% end %>


Crear select para elegir un elemento al que pertenecemos (belongs_to)
En este ejemplo, el modelo HostGroup tiene declarado, belongs_to :service)
<%= collection_select :host_group, :service_id, @services, :id, :name, :prompt => 'Please select service'  %>
  El primer y segundo parámetro se usan para definir el id y name del <select> (el primer elemento lo podríamos poner a nil)
  En este ejemplo quedaría: <select id="host_group_service_id" name="host_group[service_id]">
  El parametro name es importante para ver a donde se postean los datos (postear a la clase host_group, parametro service_id
  collection_select object, method, collection, value_method, text_method, options = {}, html_options = {}
  http://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_select
  Para definir el valor por defecto: ,{:selected => "whatever_value"})
    Para que no falle el valor por defecto: 
      <%= f.collection_select(:project_id, Project.all, :id, :name, @contact.project_id? ? {selected: @contact.project.id} : {}) %>

Dar a elegir la opción null
<%= f.collection_select(:command_id, @commands, :id, :name, include_blank: true ) %>
  CUIDADO, siempre nos pondrá como opción el blank, aunque tenga ya tenga un valor.

Mejor usar:
<%= f.select :check_period_id, @periods.collect {|p| [ p.name, p.id ]} + [['texto',23],'prueba',''] %>
<select id="service_template_check_period_id" name="service_template[check_period_id]">
  <option value="2">asdad</option>
  <option value="23">texto</option>
  <option value="prueba">prueba</option>
</select>

Si está ya definido, elegimos el definido, si no existe un comando "check_nrpe" elegimos el primero. Si existe, elegimos check_nrpe
<%= f.collection_select :command_id, @commands.order('name ASC'), :id, :name, f.object.command_id || (@commands.find_by name: "check_nrpe").nil? ? {} : {selected: (@commands.find_by name: "check_nrpe").id}, {class: "command_select"} %>


<%= f.password_field :pass %>
<%= f.range_field :cantidad %> <- un slider para seleccionar un valor
<%= f.email_field :email %> <- en los telefonos nos abrirá el teclado listo para escribir un email
<%= f.url_field :website %> <- en los telefonos nos abrirá el teclado listo para escribir una url
<%= f.telephone_field :tlf %> <- en los telefonos nos abrirá el teclado listo para escribir un telefono


## Fields sin submit ##
fields_for @elemento do |e|

<%= f.fields_for :host_groups, @project.host_groups.where(environment_id: @env) do |builder| %>

## Cascada de selects ##
Eligo un valor en un select, y dependiendo de ese, aparecen unas u otras opciones en el siguiente select.
http://railsguides.net/2013/09/05/cascading-selects-with-ajax-in-rails/ <- con este no lo he conseguido, pero puede que me faltase reiniciar el server
  Este hace uso de peticiones json al server

http://pullmonkey.com/2012/08/11/dynamic-select-boxes-ruby-on-rails-3/
  Este inserta código JS en el _form.html.erb, y mediante ajax obtiene lo que tiene que cambiar

Creo app/assets/javascripts/jquery-dynamic-selectable.coffee y meto el código.
Edito app/assets/javascripts/application.coffee y meto las dos líneas.

En las rutas yo prefiero usar las clases que ya existen: 
Pongo:
  resources :projects do
    get 'host_groups'
  end
Para tener la ruta:
project_host_groups GET    /projects/:project_id/host_groups(.:format)       projects#host_groups

Ahora configuro ese controlador para contestar json con los datos necesarios:

