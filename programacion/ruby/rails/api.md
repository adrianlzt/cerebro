Para crear una url que conteste con una función definida por nosotros:
1.- añadir una nueva ruta
2.- crear una acción nueva en el controller

routes.rb:
resources :zombies do:
  resources :tweets
  get :decomp, on: :member
end

controller:
def decomp
  @zombie = Zombie...
  if @zombie.var == "algo"
    render json: @zombie, status: :unprocessable_entity
  else
    render json: @zombie, status: :ok
  end
end

Con Rails 4, si hacemos la peticion blabla/4/bla.json, irá a buscar la vista nombre.json.jbuilder, donde se especificará que parámetros devolver.
Es aplicar el concepto de templates a json
cat views/zombies/cosa.json.jbuilder 
json.extract! @zombie, :name, :bio, :age

Para arrays:
json.array! @hostgroups


Para devolver solo unos parámetros determinador: http://api.rubyonrails.org/classes/ActiveModel/Serializers/JSON.html#method-i-as_json
@zombie.to_json(only: :name)
@zombie.to_json(only: [:name,:age])
@zombie.to_json(except: [:name,:id,:updated_at])
@zombie.to_json(include: :brain, except: [:name,:id,:updated_at]) <- si el zombie tiene brain
user.as_json(include: { posts: { include: { comments: { only: :body } }, only: :title } }) 


Si queremos que @zombie.to_json devuelva solo unos parámetros determinados, en vez de tener que definir que queremos cada vez.
En el modelo:
def as_json(options = nil)
  super(options || 
        { include: :brain, except: :name })
  end
end



## Comunicar cliente y servidor mediante una API JSON, usando en el lado cliente código javascript ##
mirar ajax.md


## Root element ##
Si queremos que el render json muestre el elemento padre:
[{"host_group":{"id":2,"name":"webserver","crea
Debemos activarlo:
config/initializers/wrap_parameters.rb
ActiveSupport.on_load(:active_record) do
 self.include_root_in_json = true
end
Será necesario reiniciar el server.
