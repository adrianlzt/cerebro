type Tiger
  taillength::Float64
  coatcolor # not including a type annotation is the same as `::Any`
end

# The default constructor's arguments are the properties
# of the tyep, in order the order they are listed in the definition
tigger = Tiger(3.5,"orange") #=> Tiger(3.5,"orange")

# The type doubles as the constructor function for values of that type
sherekhan = typeof(tigger)(5.6,"fire") #=> Tiger(5.6,"fire")

# These struct-style types are called concrete types
# They can be instantiated, but cannot have subtypes.
# The other kind of types is abstract types.

# abstract Name
abstract Cat # just a name and point in the type hierarchy

# <: is the subtyping operator
type Lion <: Cat # Lion is a subtype of Cat
  mane_color
  roar::String
end

# You can define more constructors for your type
# Just define a function of the same name as the type
# and call an existing constructor to get a value of the correct type
Lion(roar::String) = Lion("green",roar)
# This is an outer constructor because it's outside the type definition
# Esto quiere decir que podemos construir un tipo leon de dos formas distintas
leon1 = Lion("color1","roar1") #=> Lion("color1","roar1")
o con el constructor que se ha definido fuera del type (Lion(roar::String) = Lion("green",roar)):
leon2 = Lion("roar2") #=> Lion("green","roar2")

type Panther <: Cat # Panther is also a subtype of Cat
  eye_color
  Panther() = new("green")
  # Panthers will only have this constructor, and no default constructor.
end
# Using inner constructors, like Panter does, gives you control
# over how values of the type can be created.
# When possible, you should use outer constructors rather than inner ones.

Este caso es distinto, aqui se declara el constructor dentro, y desaparece el de por defecto.
Solo podemos construir un tipo pantera sin parámetros:
pantera = Panther() #=> Panther("green")


Para acceder a las variables usamos 'dot notation'
pantera.eye_color
