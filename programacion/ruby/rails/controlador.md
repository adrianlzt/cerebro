Si hacemos una petición contra nuestra aplicación:
http://laapp.com/[algo]
Si ese algo está en el directorio public, nos devolverá el elemento, si no, pasará el control a rails.

app/controllers/tweets_controller.rb

class TweetsController < ApplicationController
  def show <- automaticamente procesa y renderiza show.html.erb (si quisieramos apuntar a otro fichero: render :action => 'status' ---> status.html.erb
    @tweet = Tweet.find(1) <- la @ dice que queremos usar la variable en nuestra vista. Podemos usar params[:id] para obtener el numero del GET HTTP
  end
end

show.html.erb
<h1><%= @tweet.Status %></h1>


## Renders ##
Para obtener los valores en otros formatos:
NOTA Rails 4: parece que ahora con def.show sin nada más ya contesta a html y json. Para json mira en views/nombre/show.json.erb y usa jbuilder para contestar.
def show 
  @tweet = Tweet.find(params[:id])
  respond_to do |format|
    format.html #show.html.erb
    format.xml { render :xml => @tweet } <- vieja sintaxis 1.8 (valida en 1.9)
    format.json { render json: @tweet } <- nueva sintaxis ruby 1.9
  end
end

tweets/1.xml
tweets/1.json

Para renderizar otros .erb
def show:
  respond_to do |format|
    format.html do
      if @zombie.var == "Algo"
        render :otro <- otro.html.erb
      end <- else, rederizará show.html.erb
    end
    format.json { render json: @tweet }
  end
end


Si solo usamos html podemos simplificar:
def show:
  if @zombie.var == "Algo"
    render :otro <- otro.html.erb
  end <- else, rederizará show.html.erb
end

Solo renderizar json
def show:
  render json: @zombie
end

@zombie.to_json(only: :name)
@zombie.to_json(only: [:name,:age])
@zombie.to_json(except: [:name,:id,:updated_at])
@zombie.to_json(include: :brain, except: [:name,:id,:updated_at]) <- si el zombie tiene brain


Códigos HTTP:
200 :ok
201 :created
422 :unprocessable_entity
401 :unauthorized
102 :processing
404 :not_found

render json: @zombie.errors, status: :unprocessable_entity, location: @zombie <- devuelve una cabecera HTTP con la url del zombie


Mas en api.md


## Funciones típicas ##
def index <- muestra todos los elementos
def show <- muestra un elemento
def new <- muestra formulario para nuevo elemento
def edit <- muestra form para editar elemento
def create
def update
def destroy


Si tenemos una función que se repite en varios métodos podemos hacer:

before_filter :get_tweet, :only => [:edit, :update, :destroy]
before_filter :check_auth, :only => [:edit, :update, :destroy]

def get_tweet
  @tweet = Tweet.find(params[:id])
end

def check_auth
  if session[:zombie_id] != @tweet.zombie_id
    redirect_to(tweets_path, :notice => "Lo siento, no puedes editar este tweet")
  end
end


## Includes
@zombies = Zombie.includes(:brain).all
Al hacer la query para obtener el objeto @zombies, también lanza una query para obtener los datos de la tabla brain que pueda necesitar por tener relación.
