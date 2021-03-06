Generar modelos:
rails g model Brain zombie_id:integer status:string flavor:string
  Si el model tiene dos palabras: BrainGroup, luego se le referenciará como brain_groups o brain_group
  El campo zombie_id:integer es para asociar este model con otro model (zombie)
  Si creamos este tipo de relaciones es conveniente crear un índice en la migración: add_index :brains, :zombie_id

app/models/tweet.rb

class Tweet < ActiveRecord::Base

end

Esta clase generará la tabla 'tweets' (minúsculas y plural)


## Orden ##
Conseguir que este elemento siempre aparezca ordenado alfabéticamente.
app/models/elemento.rb
default_scope { order(:name) }


## Validaciones ## http://guides.rubyonrails.org/v3.2.13/active_record_validations_callbacks.html
Hay un montón para todos los tipos de datos

validates_presence_of :status <- comprueba que esté definido
validates :status, :presence => true, :length => { :minimum => 3 }


## Relaciones / Relationships: http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html
belongs_to (es donde se pone el enlace a la key)
has_many (debemos usar el plural, y en casos como category, pasará a ser categories)
has_one

Relación M-N:
  Necesitaremos una tabla intermedia donde se haga la relación entre, por ejemplo, usuarios y roles.
  Dicha tabla tendrá belongs_to a usuarios y roles.
  Usuarios y roles tendrán has_many a la tabla intermedia, y has_many :cosas, ambos con through: :tabla_intermedia
  También se puede hacer con has_and_belongs_to_many :users/roles en cada model (nombre en plural)
  El nombre de la tabla en orden alfabético? (primero el objeto alfabéticamente precedente)
  Recomendación: crear índice para los dos id de la tabla intermedia.
    rails g migration users_roles user_id:integer role_id:integer

    Rellenar la migración:
    class UsersRoles < ActiveRecord::Migration
      def change
        create_table :users_roles do |t|
	  t.integer :user_id
	  t.integer :role_id
	  t.timestamp
	end
	add_index :users_roles, [:user_id, :role_id]
      end
    end

    Para agregar un role al usuario:
    user.roles << Role.last <- es lo mismo que user.roles.push Role.last


Para crear un select donde poder elegir varios elementos:
<%= f.select :project_ids, @projects.map {|p| [p.name, p.id]}, {}, {:multiple=>true} %>
Es necesario en el controlador modificar el params.require y añadir al final: project_ids: []



Un Tweet pertenece a un usuario:
class Tweet < ActiveRecord::Base
  belongs_to :user <- en singular!
end

class User < ActiveRecord::Base
  has_many :tweets <- en plural!
end

class User < ActiveRecord::Base
  has_one :brain <- en singular!
end
Esto generará una función que podremos usar como:
user.create_brain(...) y se creará un brain asociado a dicho usuario. La asociación caerá del lado del brain, donde estará el _id que apunte al usuario

Para eliminar el cerebro si se elimina el usuario
class User < ActiveRecord::Base
  has_one :brain, dependent: :destroy
end

Otras opciones de relación:
foreign_key: :undead_id (nos dice que columna debemos mirar para unir nuestra tabla con otra tabla)
primary_key: :zid (decimos que columna es la que usamos como id)
validate: true (cuando se valida un zombie se valida también el cerebro, y ambos deben pasar)
Ejemplos:
  belongs_to :tweet, foreign_key: :tweeter_id
  has_one :location, foreign_key: :tweeter_id, dependent: :destroy


z = Zombie.find(2)
z = Zombie.find(2)
t = Tweet.create(..., :zombie = z)
t.zombie.name
z.tweets.count
z.tweets <- array de los tweets de este zombie



## Named scope
Dentro del modelo escribimos:

scope :rotting, where(rotting: true)

Ahora en el controlador podemos hacer:
@rotting_zombies = Zombie.rotting

Mas ejemplos:
scope :fresh, where("age < 20")
scope :recent, order("created_at desc").limit(3)
scope :graveyard, where(show_location: true, location: "graveyard")


## Callbacks
http://guides.rubyonrails.org/active_record_callbacks.html

Si queremos ejecutar alguna acción sobre los datos cuando estos se cambian.
Se pueden usar varias veces el mismo callback

before_
after_
	validation
	save
	create
	update
	destroy

Se pueden poner condicionales: after_xxx :blabla, if: :funcion?

También se pueden pasar macros:
before_create do |user|
  user.name = user.login.capitalize if user.name.blank?
end


Por ejemplo, definir a true una variable cuando un valor cambie:

before_save :make_rotting

def make_rotting
  if age > 20 <- para leer atributos no hace falta self.
    self.rotting = true <- para settearlos si hace falta self.
  end
end

El if mejorado:
self.rotting = true if age > 20


CUIDADO con los valores que devolvamos. Si ponemos una función con 'before_save' que devuelta false ('return false' o simplemente 'false') devolverá false cuando intentemos hacer elemento.save, y no se guardará. Si cualquiera de los callbacks devuelve false, se para el .save o el .destroy


Ejemplos:
after_create :send_welcome_email
before_save :encrypt_password
before_destroy :set_deleted_flag (la idea es que marquemos un boolean a 1 para decir que hemos borrado algo, o seetemos un date time. Luego la función devolverá false para parar el borrado)

after_destroy :log_destroy
def log_destroy
  logger.info "Elemento #{id} borrado"
end


# Nuevos setters o getters

  def name
    self.hostname
  end

  def name= name
    self.hostname = name
  end


# Comparación

  def self.attributes_to_ignore_when_comparing
    [:id, :created_at, :updated_at, :host_group_id, :check_id, :host_id, :environment_id, :vip_id, :project_id, :command_id, :eventhandler_id]
  end

  def ==(comparison_object)
    comparison_object.command.name == self.command.name and
    comparison_object.check.name == self.check.name and
    comparison_object.check.name == self.check.name and
    self.attributes.except(*self.class.attributes_to_ignore_when_comparing.map(&:to_s)) ==
    comparison_object.attributes.except(*self.class.attributes_to_ignore_when_comparing.map(&:to_s))
  end

