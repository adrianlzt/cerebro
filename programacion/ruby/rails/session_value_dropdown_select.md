Quiero tener un desplegable siempre mostrado donde me permita elegir en que entorno me encuentro.

Lo primero será crear un ActiveObject para almacenar este valor:
  rails g scaffold environment name:string descriptiton:string

Creo un par de entornos.

Creo el html select:
app/views/layouts/application.html.erb
<div id="user_login_box" style="float:right">
  <b>Entorno:</b> <%= collection_select(:post, :environment_id, Environment.all, :id, :name, {:selected => cookies[:env]}) %> |
</div>


Creamos el javascript que envie la información en caso de modificar el select:
app/assets/javascripts/environments.js.coffee
$(document).on 'ready page:load', ->
  $('#post_environment_id').change (event) ->
    environment = $(this).val()
    url = "/users/env"

    $.ajax
      type: 'post'
      url: url
      data: { cookie: environment }
      dataType: 'json'
      success: ->
        window.applicationCache.update
        location.reload()


Añadimos una función para setear la cookie (es a quien llamará el ajax)
controllers/users_controller.rb:
  def set_env
    @value = params[:cookie]
    @env = Environment.find(@value)
    cookies[:env] = @value
    respond_to do |format|
      format.json { render json: {valor: @env.name} }
    end
  end


Añadimos la ruta para este controlador:
  resources :users do
    post :env, on: :collection, to: "users#set_env"
  end
