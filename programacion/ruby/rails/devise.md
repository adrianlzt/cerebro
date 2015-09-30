http://devise.plataformatec.com.br/
Reiniciar el server tras cada cambio (tiene que ver con esta gema?)

Gema para gestionar la autentificación de usuarios.
Se puede implementar facilmente logueo con cuentas de facebook, google, etc


echo gem 'devise' >> Gemfile

rails g devise:install
  Nos suelta una pequeña doc con los pasos básicos que debemos realizar


Nosotros haremos:

1.- Tener definido un mailer

2.- Meter un par de clases para avisar al usuario sobre cosas de devise
app/views/layouts/application.html.erb
<body>
  <p class="notice"><%= notice %></p>
  <p class="alert"><%= alert %></p>

3.- Tener un controlador para la web  principal
  routes.rb <- es obligatorio tener un root definido a donde se enviará al usuario tras loguearse.
  Primero buscara un user_root_path, y si no root_path
    root 'welcome#index'

  rails g controller welcome index

4.- Generamos el modelo con el que trabajará devise
  rails g devise User

  En el fichero de migración que genera se pueden definir un montón de parámetros.
  Por ejemplo, no permitir acceso hasta que la cuenta esté confirmada, como desbloquear una cuenta, etc

rake db:migrate

rails s

http://localhost:3000/users/sign_up
  En esta web nos permite crear una cuenta, y tras ello nos loguea.


## Helpers ##
Vemos algunos helpers disponibles, los probamos sobre views/welcome/index.html.erb

<% if user_signed_in? %>
  <p>Bienvenido <%= current_user.email %></p>
  <p><%= link_to "Cerrar sesión", destroy_user_session_path, method: :delete %></p>
<% else %>
  <p><%= link_to "Crea una cuenta", new_user_registration_path %></p>
  <p>Si ya tienes cuenta <%= link_to "logueate", new_user_session_path %></p>
<% end %>

Para limitar el acceso a un controler, poner tras la definición de la clase:
before_filter :authenticate_user!

Otros:
  user_signed_in?
  current_user
  user_session

Todos estos helpers se generan en el routes.rb, con la línea:
devise_for :users
Con rake routes podemos ver todas las rutas:
  new_user_session
  user_session
  destroy_user_session
  user_password
  new_user_password
  edit_user_password
  cancel_user_registration
  user_registration
  new_user_registration
  edit_user_registration


## Vistas ##
Para poder modificar las vistas:
rails g devise:views
  Nos generará todos lo ficheros de las vistas para poder hacer modificaciones sobre ellos.
rails g devise:views users
  Para generar las específicas del modelo 'user' (por si tenemos más modelos)
  Necesitaremos hacer set "config.scoped_views = true" inside "config/initializers/devise.rb"


## Controllers ##
Los controladores no se generan, si los necesitamos modificar los tendremos que crear a mano. Ejemplo:
rails g controller registrations

Deberemos indicarle en el routes que estamos usando un nuevo controlador, routes.rb
  devise_for :users, controllers: {registrations: 'users/registrations', sessions: 'users/nombreControladorSesiones'}

  Movemos el controlador a app/controller/users/ (en el caso de que nuestro modelo se llame users)
  La clase la renombraremos como: Users::RegistrationsController
  Ahora deberemos modificar el controlador para que herede de devise:
    class Users::RegistrationController < Devise::RegistrationsController

  Si necesitamos el de sesión: Devise:SessionsController
  El código de las clases: https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb

  En las acciones que no modifiquemos dejamos una llamada al padre. Ej.:
  def new
    super
  end

  Si quisieramos modificar create, por ejemplo:
  def create
    super
    // mi código
  end

  Un caso típico es que tras el loggin se redirija al usuario a la web que estaba viendo, en vez de al index, que es lo que hace devise por defecto.


## Agregar nuevos parámetros ##

rails g migration AddColumnsToUsers username:string

Ahora lo agregamos a Devise. Modificamos controllers/application_controller.rb
  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end

Ahora podemos agregar en la vista new.html.erb un f.text_field :username 

Para el caso con varios modelos mirar: http://devise.plataformatec.com.br/#getting-started/configuring-models


## Gestionar approval de usuarios desde un user admin ##
https://github.com/plataformatec/devise/wiki/How-To%3a-Require-admin-to-activate-account-before-sign_in

Lo mas sencillo es hacer un scaffold de uuser, y luego cambiar uuser->user y Uuser -> User, y usar ese esqueleto generado para modificar lo de approval y admin.

Las rutas, debe ir antes la de devis que el resources :users



## Token auth ##
Quitada en devise 3.1: http://blog.plataformatec.com.br/2013/08/devise-3-1-now-with-more-secure-defaults/

http://stackoverflow.com/questions/5973327/using-devise-1-3-to-authenticate-json-login-requests/22582952#22582952
  esta es muy sencilla, pero no consigo que me funcione
https://gist.github.com/josevalim/fb706b1e933ef01e4fb6
http://matteomelani.wordpress.com/2011/10/17/authentication-for-mobile-devices/
https://gist.github.com/jwo/1255275



# Login con curl
http://stackoverflow.com/questions/28841168/devise-authentication-using-curl
