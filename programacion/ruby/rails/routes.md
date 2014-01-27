http://blog.engineyard.com/2010/the-lowdown-on-routes-in-rails-3

app/config/routes.rb

NombreApp::Application.routes.draw do
  reosurces :tweets
end

Para ver las rutas que se crean: rake routes

Este código genera los "enlaces" entre el código (tweets_path, new_tweet_path, etc) a las url (/tweets, /tweets/new, etc) y el controlador(def index, def new, etc)
Si queremos un enlace pero con .json lo haremos así: project_host_path(':project_id', format: :json)

Para crear rutas:
match 'nuevo_tweet', :to => "tweets#new"
match 'nuevo_tweet' => "tweets#new"
  miapp.org/nuevo_tweet -> llama al controlador Tweet funcion 'def new'
  Este match hace que /nuevo_tweet actue igual que /new

Para que se cree una variable que apunte a nuestro nuevo path:
match 'all' => "tweets#index", :as => "all_tweets"
  Ahora podemos usarlo: <%= link_to "All tweets", all_tweets_path %>

match "account/overview"
es lo mismo que
match "account/overview", :to => "account#overview"


Para redireccionar:
match 'all', :to => redirect('/tweets')
match 'all' => redirect('/tweets')
  Cuando pongamos /all nos hará un 300 a /tweets

match 'google', redirect('http://www.google.com')

This code will redirect /foo/1 to /bar/1s:
match "/foo/:id", :to => redirect("/bar/%{id}s")

This code will redirect /account/proc/john to /johns.
match 'account/proc/:name', :to => redirect {|params| "/#{params[:name].pluralize}" }



Ruta por defecto:
root :to => "tweets#index"


Obtener valores del GET:
/local_tweets/23532
  match 'local_tweets/:zipcode' => "tweets#index"

En el def index dispondremos de la variable params[:zipcode]

match 'local_tweets/:zipcode' => "tweets#index", as => 'localt'
<%= link_to "Tweets in 2323", local_tweets_path(2323) %>


Para sacar tweets de un user: miapp.org/peter

router:
  match ':name' => "tweet#index", :as => 'zombie_tweets'

vista
  <%= link_to "Pepe", zombie_tweets_path('pepe') %>

controlador:
  def index
    if params[:name]
    ...
  end
end


## Custom routes ##
on: :member -> un único elemento
on: :collection -> una serie de elementos

Route				URL			Route Helper
get :decomp, on: :member	/zombies/:id/decomp	decomp_zombie_path(@zombie)
put :decay, on: :member		/zombies/:id/decay	decay_zombie_path(@zombie)
get :fresh, on: :collection	/zombies/fresh		fresh_zombies_path
post :Search, on: :collection	/zombies/search		search_zombies_path

Ejemplos:
<%= link_to "Fresh zombies", fresh_zombies_path %>
<%= form_tag(search_zombies_path) do |f| %>

resources :zombies do:
  resources :tweets
  get :decomp, on: :member
end
$ rake routes
decomp_zombie GET /zombies/:id/decomp {:action=>"decomp", :controller=>"zombies"}

Si no declaramos member nos generaría la ruta como: /zombies/:zombie_id/decomp


## Nested routes ##
Si tenemos declarado
resources :zombies
resources :tweets

Para encontrar todos los tweets de un zombie
/tweets?zombie_id=4
  No muy RESTful, tweets no deben existir sin un zombie

Usamos nested routes:
resources :zombies do
  resources :tweets
end
Ahora será: /zombies/4/tweets

Para ver las rutas creadas:
rake routes

Para que todo siga funcionando deberemos actualizar el controlador, los templates y el formulario de tweet.

Controlador, debemos obtener los tweets de nuestro zombie:
Para el caso de mostrar un tweet de zombie: /zombies/4/tweets/2, params={zombie_id: 4, id: 2}
  before_filter :get_zombie
  def get_zombie
    @zombie = Zombie.find(params[:zombie_id])
  end
  def show
    @tweet = @zombie.tweets.find(params[:id])
  end
  def index
    @tweet = @zombie.tweets
  end

En el respond_to también deberemos agregar @zombie donde sea necesario
redirect_to [@zombie,@tweet]
json: [@zombie,@tweet]
location: [@zombie,@tweet]

Para el template tenemos que modificar los parámetros que enviamos, ya que ahora queremos el zombie_id y el tweet_id
link_to "#{@zombie.name}'s Tweets", zombie_tweets_path(@zombie)
link_to "New Tweet", new_zombie_tweet_path(@zombie)
link_to "Edit", edit_zombie_tweet_path(@zombie,tweet)
link_to "Show", zombie_path(@zombie,tweet)  ó  link_to "Show", [@zombie,tweet] 
link_to "Destroy", [@zombie,tweet], method: :delete

Para el form_for:
form_for([@zombie,@tweet])
